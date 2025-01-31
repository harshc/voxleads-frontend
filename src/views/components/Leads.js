import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import api from "../../services/api";
import { auth } from "../../firebase-config"; // Import Firebase auth
import { useNavigate } from "react-router-dom";


const Leads = () => {
  const [clientId, setClientId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [csvFile, setCsvFile] = useState(null); // Store the CSV file
  const [phoneList, setPhoneList] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10; // Number of leads per page

  const expectedHeaders = [
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "notes",
    "street_address",
    "city",
    "state",
    "country",
    "zip_code",
    "status",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve clientId from localStorage

    if (!clientId) {
      // If localStorage is empty, get the authenticated user from Firebase
      const currentUser = auth.currentUser;
      if (currentUser) {
        setClientId(currentUser.uid);
      }
    }
  }, []);

  useEffect(() => {
    if (clientId) {
      fetchPhoneList();
    }
  }, [clientId]);  // Runs fetchPhoneList when clientId changes
  /**
   * The `handleFileUpload` function in JavaScript validates and parses a CSV file uploaded by the
   * user.
   * @param event - The `event` parameter in the `handleFileUpload` function is an event object that is
   * passed when a file upload event occurs. It contains information about the event, such as the
   * target element that triggered the event and the files that were uploaded. In this case, we are
   * accessing the uploaded file
   * @returns The `handleFileUpload` function is processing a CSV file upload. It checks if the
   * uploaded file is a CSV file, reads the content of the file, validates the headers, and parses the
   * data into an array of objects based on the headers. The function returns the parsed data as an
   * array of objects.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      alert("Invalid file format. Please upload a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result.trim();
      const lines = content.split("\n").map((line) => line.trim());

      if (lines.length < 2) {
        alert("CSV file is empty or invalid!");
        return;
      }

      // Validate headers
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const missingHeaders = expectedHeaders.filter((header) => !headers.includes(header));

      if (missingHeaders.length > 0) {
        alert(`Invalid CSV format! Missing headers: ${missingHeaders.join(", ")}`);
        return;
      }

      // Parse data
      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || "";
        });

        return obj;
      });

      // Ensure required fields are filled
      for (const row of data) {
        if (!row.phone_number || !row.first_name || !row.last_name) {
          alert("Each row must have at least a phone number, first name, and last name!");
          return;
        }
      }

      setCsvData(data);
      setCsvFile(file);
      console.log("csv file validated successfully")    
    };

    reader.readAsText(file);
  };

  /**
   * The `handleUpload` function is an asynchronous function that handles uploading a CSV file to a
   * server endpoint and displays success or failure alerts based on the response.
   * @returns The `handleUpload` function is being returned.
   */
  const handleUpload = async () => {
    if (!csvData && !csvFile) {
      alert("Please upload a valid CSV file first!");
      return;
    }

    if (!clientId) {
      navigate("/auth/login")
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile); 

    try {
      // const response = await api.post(`/clients/${clientId}/upload-phone-list`, {
      //   method: "POST",
      //   body: formData,
      // });

      const response = await api.post(`/clients/${clientId}/upload-phone-list`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });

      const result = await response.data;
      if (response.ok) {
        console.log(`Upload successful! ${result.uploaded_count} leads added.`);
      } else {
        console.error(`Upload failed: ${result.detail}`);
      }
    } catch (error) {
      console.error("Error uploading CSV file. Please try again.");
    }
  };

  /**
   * Fetch phone list from API and update the state.
   */
  const fetchPhoneList = async () => {
    try {
      if (!clientId) {
        navigate("/auth/login");
        return;
      }
  
      const response = await api.get(`/clients/${clientId}/phone-list`);
  
      // Ensure response format is correct
      if (response.status === 200 && response.data && Array.isArray(response.data.leads)) {
        setPhoneList(response.data.leads); // ✅ Set the leads array correctly
      } else {
        console.error("Unexpected response format:", response.data);
        setPhoneList([]); // Set empty array to prevent crashes
      }
    } catch (error) {
      console.error("Error fetching phone list:", error);
  
      if (error.response) {
        console.error(`Failed to fetch phone list: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        console.error("Network error: Unable to connect to the server. Please check your internet connection.");
      } else {
        console.error(`Unexpected error: ${error.message}`);
      }
  
      setPhoneList([]); // Prevent undefined state issues
    }
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = phoneList.slice(indexOfFirstLead, indexOfLastLead);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(phoneList.length / leadsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(phoneList.length / leadsPerPage);
  const pageNumbers = [];
  if (totalPages > 0) {
    pageNumbers.push(currentPage); // Always show current page
    if (currentPage > 1) pageNumbers.unshift(currentPage - 1); // Show previous page if available
    if (currentPage < totalPages) pageNumbers.push(currentPage + 1); // Show next page if available
  }
  // Change page
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedLead({ ...selectedLead, [name]: value });
  };

  const handleSave = async () => {
    if (!clientId || !selectedLead) return;

    try {
      const response = await api.put(`/clients/${clientId}/update-lead/${selectedLead.phone_number}`, selectedLead);

      if (response.status === 200) {
        console.log("Lead updated successfully!");
        fetchPhoneList(clientId);
        setEditMode(false);
      } else {
        console.error(`Failed to update lead: ${response.data.detail}`);
      }
    } catch (error) {
      console.error(`Error updating lead. Please try again.: ${error.message}`);
    }
  };

  const handleDelete = async (phoneNumber) => {
    if (!clientId || !selectedLead) return;
  
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
  
    try {
      const response = await api.delete(`/clients/${clientId}/delete-lead/${selectedLead.phone_number}`);
  
      if (response.status === 200) {
        console.log("Lead deleted successfully!");
        fetchPhoneList();  // Refresh the phone list
      } else {
        console.error(`Failed to delete lead: ${response.data.detail}`);
      }
    } catch (error) {
      console.error(`Error deleting lead. Please try again. ${error.message}`);
    }
  };
  

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"; // Green
      case "pending":
        return "warning"; // Yellow
      case "flagged":
        return "danger"; // Red
      case "unsubscribed":
        return "secondary"; // Grey
      default:
        return "success"; // Default color
    }
  };

  const handleStatusToggle = () => {
    setSelectedLead((prevLead) => ({
      ...prevLead,
      status: prevLead.status === "active" ? "unsubscribed" : "active",
    }));
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4" className="mb-4">
            <Card className="card-profile shadow sticky-top">
              <CardBody className="pt-0 pt-md-4">
                <div className="">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        All Leads
                      </a>
                    </li>
                    <li>
                      <a href="#add-new" className="d-flex icon-link px-4 py-2">
                        Add New
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Lead Groups (coming soon)
                      </a>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                    <h3 className="mb-0">All Leads</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#add-new"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Add New
                    </Button>
                    </Col>
                </Row>
              </CardHeader>
              {phoneList.length > 0 ? (
                <Table className="align-items-center table-flush table-light table-striped table-hover" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeads.map((lead, index) => (
                      <tr key={index} onClick={() => handleRowClick(lead)} style={{ cursor: "pointer" }}>
                        <td>{lead.first_name} {lead.last_name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone_number}</td>
                        <td>
                          <Badge color="${getStatusBadge(lead.status)}" className="badge-dot" >
                            <i className={`bg-${getStatusBadge(lead.status)}`} />
                            {lead.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <CardBody className="pt-0 pt-md-4">
                  <p>Loading leads...</p>  // ✅ Show loading message if phoneList is empty
                </CardBody>
              )}
              <CardFooter className="py-4">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col xs="4">
                    Showing <span className="font-bold">{indexOfFirstLead+1} - {indexOfLastLead}</span> of {phoneList.length+1}
                  </Col>
                  <Col xs="8">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem disabled={currentPage === 1}>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => goToPage(currentPage-1)}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                                    {/* Page Numbers (Show Only 2 Pages at a Time) */}
                        {currentPage > 1 && (
                          <PaginationItem key={currentPage-1}>
                            <PaginationLink
                              href="#pablo"
                              onClick={() => goToPage(currentPage - 1)}>
                                {currentPage - 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        <PaginationItem active>
                          <PaginationLink
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {currentPage}
                            </PaginationLink>
                        </PaginationItem>

                        {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink
                              href="#pablo"
                              onClick={() => goToPage(currentPage + 1)}>
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>
                        )}


                        <PaginationItem disabled={currentPage >= totalPages}>
                          <PaginationLink
                            href="#pablo"
                            onClick={() => goToPage(currentPage + 1)}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
            {selectedLead && (
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Lead Details</h3>
                    </Col>
                    <Col className="text-right">
                      {!editMode ? (
                        <Button color="primary" onClick={() => setEditMode(true)}>
                          Edit
                        </Button>
                      ) : (
                        <Button color="success" onClick={handleSave}>
                          Save
                        </Button>
                      )}
                    </Col>
                    <Col className="text-right">
                      <Button color="light">
                        Close
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    {/* Status Toggle */}
                    <Row className="mb-3">
                      <Col>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="leadOnOff"
                            checked={selectedLead.status === "active"}
                            onChange={handleStatusToggle}
                            disabled={!editMode}
                          />
                          <label className="form-check-label" htmlFor="leadOnOff">
                            <Badge color="" className="badge-dot">
                              <i className={`bg-${getStatusBadge(selectedLead.status)}`} />
                              {selectedLead.status}
                            </Badge>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {/* Status Dropdown */}
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Status</label>
                          <Input
                            type="select"
                            name="status"
                            value={selectedLead.status}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="flagged">Flagged</option>
                            <option value="unsubscribed">Unsubscribed</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Personal Details */}
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            type="text"
                            name="first_name"
                            value={selectedLead.first_name}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            type="text"
                            name="last_name"
                            value={selectedLead.last_name}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            type="email"
                            name="email"
                            value={selectedLead.email}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <Input
                            type="text"
                            name="phone_number"
                            value={selectedLead.phone_number}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Address Fields */}
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label>Street Address</label>
                          <Input
                            type="text"
                            name="street_address"
                            value={selectedLead.street_address}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            type="text"
                            name="city"
                            value={selectedLead.city}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>State</label>
                          <Input
                            type="text"
                            name="state"
                            value={selectedLead.state}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            type="text"
                            name="country"
                            value={selectedLead.country}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Zip Code</label>
                          <Input
                            type="text"
                            name="zip_code"
                            value={selectedLead.zip_code}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Notes */}
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label>Notes</label>
                          <Input
                            type="textarea"
                            name="notes"
                            value={selectedLead.notes}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    

                    {/* Save/Delete Buttons */}
                    <Row className="mt-4">                      
                      <Col className="text-right">
                      {!editMode ? (
                        <Button color="primary" onClick={() => setEditMode(true)}>
                          Edit
                        </Button>
                      ) : (
                        <Button color="success" onClick={handleSave}>
                          Save
                        </Button>
                      )}
                    </Col>
                    <Col className="text-right">
                      <Button color="danger" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Col>
                    </Row>
                  </Form>
                </CardBody>

              </Card>
            )}

{/*             
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Lead Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                  <div className="d-flex justify-content-between mb-4">
                    <div>
                      <h6 className="heading-small text-muted">
                        Lead Information
                      </h6>
                    </div>
                    <div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="leadOnOff" checked />
                        <label className="form-check-label" for="leadOnOff">
                          <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                            Active
                          </Badge>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pl-lg-4">
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            First Name
                          </div>
                          <div>
                            Sam
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Last Name
                          </div>
                          <div>
                            Smith
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Email
                          </div>
                          <div>
                            sammys@mail.com
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Phone Number
                          </div>
                          <div>
                            (555) 123-4567
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="12">
                          <div className="form-control-label">
                            Lead Notes
                          </div>
                          <div className="form-control-label">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Address
                  </h6>
                  <div className="pl-lg-4">
                    <Row className="my-4">
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Address
                          </div>
                          <div>
                            Unit 22 - 123 Calle 38 Norte
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            City
                          </div>
                          <div>
                            Playa del Carmen
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            State / Province
                          </div>
                          <div>
                            Quintana Roo
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="my-4">
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Country
                          </div>
                          <div>
                            Mexico
                          </div>
                        </div>
                      </Col>
                      <Col lg="6">
                        <div>
                          <div className="form-control-label">
                            Zip / Postal Code
                          </div>
                          <div>
                            71002
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Groups
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <div>
                          <div className="form-control-label">
                            Group_name
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
              </CardBody>
              <CardFooter className="py-4">
                <Row className="align-items-center">
                    <Col xs="8">
                    <Button
                        color="danger"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Delete Lead
                    </Button>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Edit
                    </Button>
                    </Col>
                </Row>
              </CardFooter>
            </Card> */}
            <hr className="my-4" />
            <Card id="add-new" className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add New Leads</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Bulk Upload Leads
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="clUploadcsv"
                          >
                            Upload a CSV file
                          </label>
                          <Input type="file" 
                            className="form-control-alternative" 
                            id="clUploadcsv" 
                            accept=".csv"
                            onChange={handleFileUpload}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h6 className="text-muted">Expected CSV Format:</h6>
                      <pre className="bg-light p-3">
                        <h6 className="form-control-label mb-4">first_name,last_name,email,phone_number,notes,street_address,city,state,country,zip_code,status</h6>
                        John,Doe,john.doe@example.com,1234567890,New lead,123 Main St,New York,NY,USA,10001,active
                      </pre>
                  </div>
                  <Button color="primary" href="#" onClick={handleUpload}>
                    Upload
                  </Button>
                </Form>
              </CardBody>
              <CardFooter className="py-4">
                {/* <Row className="align-items-center">
                    <Col xs="8">
                      Add a single Lead
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Click Here
                    </Button>
                    </Col>
                </Row> */}
              </CardFooter>
            </Card>
            {/* 
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Lead Profile</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Lead Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="leadStatus"
                            >
                              Status
                            </label>
                            <select className="form-control-alternative form-control" id="leadStatus">
                                <option defaultValue="0">Select one...</option>
                                <option value="1">Active</option>
                                <option value="2">Pending</option>
                                <option value="2">Unsubscribed</option>
                                <option value="2">Flagged</option>
                            </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadFirstName"
                          >
                            First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadFirstName"
                            placeholder="First Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadLastName"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadLastName"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadEmail"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadEmail"
                            placeholder="Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="leadPhone"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="leadPhone"
                            placeholder="Phone Number"
                            type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Address
                  </h6>
                  
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Lead Groups
                  </h6>
                  <p>Assign a Lead to one or several groups.</p>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <div className="d-flex justify-content-evenly">
                            <div>
                              <input type="checkbox" className="btn-check" id="btncheck1" />
                              <label className="btn btn-outline-primary" htmlFor="btncheck1">Group_name</label>
                            </div>
                            <div>
                              <input type="checkbox" className="btn-check" id="btncheck2" />
                              <label className="btn btn-outline-primary" htmlFor="btncheck2">Group_name2</label>
                            </div>
                            <div>
                              <input type="checkbox" className="btn-check" id="btncheck3" />
                              <label className="btn btn-outline-primary" htmlFor="btncheck3">Group_name3</label>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                    <Button color="primary" href="#">
                        Save
                    </Button>
                </Form>
              </CardBody>
            </Card>
            <hr className="my-4" />
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                    <h3 className="mb-0">Groups/Segments</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                    <Button
                        color="primary"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                    >
                        Add New
                    </Button>
                    </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Leads</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          <a href="#">
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-success" />
                        Published
                      </Badge>
                    </td>
                    <td>
                      <div>
                        3435
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          <a href="#">
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-warning" />
                        Pending
                      </Badge>
                    </td>
                    <td>
                      <div>
                        43
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                          <a href="#">
                            123
                          </a>
                        </span>
                      </Media>
                    </th>
                    <td>
                      <div>
                        Group Name
                      </div>
                    </td>         
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-danger" />
                        Draft
                      </Badge>
                    </td>
                    <td>
                      <div>
                        86
                      </div>
                    </td>
                    <td className="text-center">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View Group
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Group
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
            <hr className="my-4" />
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Group/Segment</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Group Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gsName"
                          >
                            Group/Segment Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="gsName"
                            placeholder="Name Your Group"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="gsStatus"
                            >
                              Group Status
                            </label>
                            <select className="form-control-alternative form-control" id="gsStatus">
                                <option defaultValue="0">Select one...</option>
                                <option value="1">Published</option>
                                <option value="2">Pending</option>
                                <option value="2">Draft</option>
                            </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="gsDescription"
                          >
                            Group Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="gsDescription"
                            placeholder="Add notes about this lead."
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                    <Button color="primary" href="#">
                        Save
                    </Button>
                </Form>
              </CardBody>
            </Card> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Leads;
