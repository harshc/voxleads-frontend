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
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase-config";
import api from "../../services/api";

const timeZones = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
  "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
  "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
  "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
  "UTC+12:00", "UTC+13:00", "UTC+14:00"
];


const timeSlots = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
  "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const Centers = () => {
  const [clientData, setClientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    gst: "",
    street_address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    manager_name: "",
    manager_email: "",
    manager_phone: "",
    total_staff: "",
    services_offered: "",
    timezone: "UTC+00:00", // Will be updated dynamically
    description: "",
    operational_hours: {
      Monday: { open: "", close: "" },
      Tuesday: { open: "", close: "" },
      Wednesday: { open: "", close: "" },
      Thursday: { open: "", close: "" },
      Friday: { open: "", close: "" },
      Saturday: { open: "", close: "" },
      Sunday: { open: "", close: "" },
    },
  });

  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  // 🕒 Convert user's timezone to UTC offset format
  const getUserTimezoneOffset = () => {
    const date = new Date();
    const offset = -date.getTimezoneOffset() / 60; // Convert minutes to hours
    const sign = offset >= 0 ? "+" : "-";
    const formattedOffset = `UTC${sign}${String(Math.abs(offset)).padStart(2, "0")}:00`;

    return timeZones.includes(formattedOffset) ? formattedOffset : "UTC+00:00";
  };

   // Fetch client data on load
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      timezone: getUserTimezoneOffset(),
    }));

    const fetchClientData = async () => {
      try {
        if (!currentUser) {
          console.error("User is not authenticated.");
          return;
        }
    
        console.log(`Fetching client with UID: ${currentUser.uid}`);
    
        // ✅ Ensure the correct UID is sent in the API request
        const response = await api.get(`/clients/${currentUser.uid}`);
    
        if (response?.data?.data) {
          console.log("Client data retrieved:", response.data.data);
          setClientData(response.data.data);
          setFormData({
            ...response.data.data,
            operational_hours: response.data.data.operational_hours || formData.operational_hours,
          });
        } else {
          console.log("No client data found.");
          setClientData(null);
          // Optionally reset form data to defaults
          setFormData({
            ...formData,
            operational_hours: formData.operational_hours,
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchClientData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOperationalHoursChange = (day, type, value) => {
    setFormData((prevState) => ({
      ...prevState,
      operational_hours: {
        ...prevState.operational_hours,
        [day]: { ...prevState.operational_hours[day], [type]: value },
      },
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      console.error("User is not authenticated.");
      console.log("You must be logged in to save company details.");
      navigate("/admin/login");
      return;
    }
  
    try {
      if (clientData && clientData.id) {
        // ✅ Update an existing client
        console.log(`Updating existing client: ${clientData.id}`);
        await api.put(`/clients/${clientData.id}`, formData);
        console.log("Company information updated successfully!");
      } else {
        // ✅ Create a new client only if none exists
        console.log("Creating a new client...");
        const response = await api.post("/clients", { ...formData, uid: currentUser.uid });
  
        if (response.data && response.data.id) {
          console.log(`New client created with ID: ${response.data.id}`);
          setClientData({ ...formData, id: response.data.id });  // ✅ Store correct Firestore ID
        }
      }
      
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving company data:", error);
      console.log("Failed to save company data. Please try again.");
    }
  };  

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Company Profile</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {!isEditing && (
                      <Button color="primary" onClick={() => setIsEditing(true)} size="sm">
                        Edit
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <h6 className="heading-small text-muted mb-4">Company Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Name</label>
                          <Input name="name" className="form-control-alternative form-control" value={formData.name} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Email</label>
                          <Input type="email" name="email" className="form-control-alternative form-control" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Phone Number</label>
                          <Input name="phone_number" className="form-control-alternative form-control" value={formData.phone_number} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label">Address</label>
                          <Input name="street_address" className="form-control-alternative form-control" value={formData.street_address} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">City</label>
                          <Input name="city" className="form-control-alternative form-control" value={formData.city} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">State</label>
                          <Input name="state" className="form-control-alternative form-control" value={formData.state} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Country</label>
                          <Input name="country" className="form-control-alternative form-control" value={formData.country} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">ZipCode</label>
                          <Input name="zip_code" className="form-control-alternative form-control" value={formData.zip_code} onChange={handleInputChange} readOnly={!isEditing} /> 
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label">Description</label>
                          <Input type="textarea" name="description" className="form-control-alternative form-control" value={formData.description} onChange={handleInputChange} readOnly={!isEditing} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <h6 className="heading-small text-muted mb-4">Operational Hours</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Timezone</label>
                          <Input type="select" name="timezone" className="form-control-alternative form-control" value={formData.timezone} onChange={handleInputChange} disabled={!isEditing}>{timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}</Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    {Object.entries(formData.operational_hours)
                    .sort((a, b) => {
                      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                      return days.indexOf(a[0]) - days.indexOf(b[0]);
                    })
                    .map(([day, hours]) => (
                        <Row key={day} className="my-2">
                          <Col lg="2">
                          <label className="form-control-label">{day}:</label>
                        </Col>
                          <Col lg="4" className="mb-2 mb-lg-0">
                          
                          <Input 
                            type="select" className="form-control-alternative form-control mx-lg-2" 
                            value={hours.open} 
                            onChange={(e) => handleOperationalHoursChange(day, "open", e.target.value)} 
                            disabled={!isEditing}
                          >
                            <option value="">Select opening time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </Input>
                        
                        </Col>
                          <Col lg="4" className="mb-2 mb-lg-0">
                          
                          <Input 
                            type="select" className="form-control-alternative form-control mx-lg-2" 
                            value={hours.close} 
                            onChange={(e) => handleOperationalHoursChange(day, "close", e.target.value)} 
                            disabled={!isEditing}
                          >
                            <option value="">Select closing time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </Input>
                        
                        </Col>
                        </Row>
                      ))}
                  </div>
                  {isEditing && <Row className="mt-4"><Col lg="6"><Button color="primary" type="submit">Save</Button></Col></Row>}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Centers;
