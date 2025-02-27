import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Badge,
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleClose = () => {
    setSelectedLead(null);
    setEditMode(false);
  };

  const handleStartCalls = async () => {
    setLoading(true);
    setMessage("");

    if (!clientId) {
      setMessage("Error: Unable to fetch client ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/calls/${clientId}/start-calls`);
      setMessage(`Client calls initiated successfully: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.detail || "Failed to start client calls"}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4" className="mb-4">
            <Card className="card-profile shadow">
              <CardBody className="pt-4">
                <div className="">
                  <ul className="list-unstyled mb-0">
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
                      <a href="javascript:void(0)" className="d-flex icon-link px-4 py-2">
                        Lead Groups (coming soon)
                      </a>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
            <Card className="card-profile shadow mt-4">
              <CardHeader className="bg-default">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h4 className="mb-0 text-white">Call Center</h4>
                  </Col>
                  <Col xs="6" className="d-flex justify-content-end">
                    <div>
                      <Button color="secondary text-primary" size="sm">
                        Vox Agent
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button color="success" size="sm">
                        Online
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-secondary border border-default">
                <Row className="mb-4">
                  <Col>
                    <Button color="success">
                      Active Call <span class="badge bg-secondary text-primary ml-4 text-xs">4:12:43 m</span>
                    </Button>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <div className="form-control-label">
                      145 Leads in the queue
                    </div>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs="6">
                    <Button color="primary" onClick={handleStartCalls}>
                        Start Calling
                    </Button>
                  </Col>
                  <Col xs="6" className="text-right">
                    <Button color="white" className="border text-xs" href="#">
                        Call Logs [COMING SOON]
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="6">
                    <h3 className="mb-0">All Leads</h3>
                    </Col>
                    <Col className="text-right" xs="6">
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
                <Table className="align-items-center table-flush table-secondary table-striped table-hover" responsive>
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
                  <p>Loading leads...</p>
                  <div>You must complete your Profile and Company information before uploading Leads.</div>
                </CardBody>
              )}
              <CardFooter className="py-4">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md="5" className="text-sm mb-3 mb-md-0">
                    Showing <strong>{indexOfFirstLead+1} - {indexOfLastLead}</strong> of {phoneList.length+1}
                  </Col>
                  <Col md="7">
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
            <hr className="my-4" />
            {/* TODO: Unselect a lead for the close button */}
            {selectedLead && (
              
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="6">
                      <h3 className="mb-0">Lead Details</h3>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                      <div>
                        {!editMode ? (
                            <Button color="primary" size="sm" onClick={() => setEditMode(true)}>
                            Edit
                            </Button>
                        ) : (
                            <Button color="primary" size="sm" onClick={handleSave}>
                            Save
                            </Button>
                        )}
                      </div>
                      <div className="ml-2">
                        {!editMode ? (
                            <Button color="light" size="sm" onclick={handleClose}>
                            Close
                            </Button>
                        ) : (
                            <Button color="light" size="sm" onClick={() => setEditMode(false)} >
                            Cancel
                            </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Status & Priority
                    </h6>
                    <div className="pl-lg-4">
                      <Row className="mb-3 align-items-center">
                        {/* Status Toggle */}
                        <Col lg="6">
                          <FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                                className="custom-control-input"
                                type="checkbox"
                                role="switch"
                                id="leadOnOff"
                                checked={selectedLead.status === "active"}
                                onChange={handleStatusToggle}
                                disabled={!editMode}
                            />
                            <label className="custom-control-label" htmlFor="leadOnOff">
                                <Badge color="" className="badge-dot">
                                <i className={`bg-${getStatusBadge(selectedLead.status)}`} />
                                {selectedLead.status}
                                </Badge>
                            </label>
                            </div>
                          </FormGroup>
                        </Col>
                        {/* Status Dropdown */}
                        <Col lg="6">
                          <FormGroup>
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

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                               className="form-control-label"
                               htmlFor="leadUrgency"
                             >
                               Urgency Rating
                             </label>
                             <select className="form-control-alternative form-control" id="leadUrgency">
                               <option selected>Select one...</option>
                               <option value="1">Critical</option>
                               <option value="2">High</option>
                               <option value="3">Medium</option>
                               <option value="4">Low</option>
                             </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                               className="form-control-label"
                               htmlFor="leadCallbydate"
                             >
                               Call By Date
                             </label>
                             <Input
                                className="form-control-alternative"
                                id="leadCallbydate"
                                type="date"
                             />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Contact Details
                    </h6>
                    <div className="pl-lg-4">
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
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Demographics
                    </h6>
                    <div className="pl-lg-4">
                     <Row>
                       <Col lg="6">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="leadAge"
                           >
                             Age
                           </label>
                           <Input
                              className="form-control-alternative"
                              id="leadAge"
                              type="text"
                           />
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="leadGender"
                           >
                             Gender
                           </label>
                           <select className="form-control-alternative form-control" id="leadGender">
                             <option selected>Select one...</option>
                             <option value="1">Male</option>
                             <option value="2">Female</option>
                             <option value="3">Other</option>
                             <option value="4">...</option>
                           </select>
                         </FormGroup>
                       </Col>
                     </Row>

                     <Row>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="leadLanguage"
                             >
                               Language
                             </label>
                             <select className="form-control-alternative form-control" id="leadLanguage">
                               <option selected>Select one...</option>
                               <option value="1">English</option>
                               <option value="2">French</option>
                               <option value="3">Spanish</option>
                               <option value="4">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                       <Col lg="6">
                         <FormGroup>
                             <label
                               className="form-control-label"
                               htmlFor="leadEthnicity"
                             >
                               Ethnicity
                             </label>
                             <select className="form-control-alternative form-control" id="leadEthnicity">
                               <option selected>Select one...</option>
                               <option value="1">Caucasian</option>
                               <option value="2">African American</option>
                               <option value="3">Latino</option>
                               <option value="4">...</option>
                             </select>
                         </FormGroup>
                       </Col>
                     </Row>

                     <Row>
                       <Col lg="6">
                         <FormGroup>
                           <label
                             className="form-control-label"
                             htmlFor="leadLanguage"
                           >
                             Yearly Household Income
                           </label>
                           <select className="form-control-alternative form-control" id="leadLanguage">
                             <option selected>Select one...</option>
                             <option value="1">0-9,999</option>
                             <option value="2">10,000-24,999</option>
                             <option value="3">25,000-34,999</option>
                             <option value="4">35,000-49,999</option>
                             <option value="5">50,000-74,999</option>
                             <option value="6">75,000-99,999</option>
                             <option value="7">100,000+</option>
                           </select>
                         </FormGroup>
                       </Col>
                     </Row>
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Additional Information
                    </h6>
                    <div className="pl-lg-4">
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
                    </div>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                        Call History
                    </h6>
                    <div className="pl-lg-4">
                      <Table className="align-items-center table-flush table-secondary table-striped table-hover border" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Call ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Minutes</th>
                            <th scope="col">Status</th>
                            <th scope="col">Agent</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <span className="mb-0 text-sm">
                                      <a href="#">
                                      Call #123456
                                      </a>
                                  </span>
                                </Media>
                              </th>
                              <td>2025-01-27 08:26:49</td>         
                              <td>
                                <div className="time-amount">
                                  04:12:34 m
                                </div>
                              </td>
                              <td>
                                <Badge color="" className="badge-dot">
                                  <i className="bg-success" />
                                  Completed
                                </Badge>
                              </td>
                              <td>
                                <div className="avatar-group">
                                  <a
                                  className="avatar avatar-sm"
                                  href="#"
                                  id="tooltip996637554"
                                  onClick={(e) => e.preventDefault()}
                                  >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                  />
                                  </a>
                                  <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip996637554"
                                  >
                                  Sara Doe
                                  </UncontrolledTooltip>
                                </div>
                              </td>
                              <td className="text-center">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only"
                                    href="#"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                    >
                                  <i className="fas fa-angle-down" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        View Call Log
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Delete Call Log
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div> 

                    {/* Save/Delete Buttons */}
                    <Row className="mt-4 justify-content-between align-items-center">
                      <Col xs="6" className="">
                        <div>
                          <Button color="danger" size="sm" onClick={handleDelete}>
                            Delete
                          </Button>
                        </div>
                      </Col>
                      <Col xs="6" className="d-flex justify-content-end">
                        <div>
                          {!editMode ? (
                              <Button color="primary" size="sm" onClick={() => setEditMode(true)}>
                              Edit
                              </Button>
                          ) : (
                              <Button color="primary" size="sm" onClick={handleSave}>
                              Save
                              </Button>
                          )}
                        </div>
                        <div className="ml-2">
                          {!editMode ? (
                            <Button color="light" size="sm" onclick={handleClose}>
                            Close
                            </Button>
                          ) : (
                            <Button color="light" size="sm" onClick={() => setEditMode(false)} >
                            Cancel
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            )}
            <div className="my-4 d-block"></div>
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
                        <Button color="primary" href="#" onClick={handleUpload}>
                          Upload
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted">Expected CSV Format:</h6>
                  <div className="pl-lg-4">
                    <pre className="bg-white p-3 border">
                      <p className="form-control-label mb-4 text-sm">first_name,last_name,email,phone_number,notes,street_address,city,state,country,zip_code,status</p>
                      <p className="mb-0 text-sm">John,Doe,john.doe@example.com,1234567890,New lead,123 Main St,New York,NY,USA,10001,active</p>
                    </pre>
                    <div className="mt-2 text-sm text-underline">
                      <a href="#">
                        Download an examples csv file
                      </a>
                    </div>
                  </div>
                </Form>
              </CardBody>
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
