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
    phone: "",
    gst: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
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
    
        if (response.data) {
          console.log("Client data retrieved:", response.data);
          setClientData(response.data);
          setFormData({
            ...response.data,
            operational_hours: response.data.operational_hours || formData.operational_hours,
          });
        } else {
          console.log("No client data found.");
          setClientData(null);
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
                      <Col lg="6"><FormGroup><label>Name</label><Input name="name" value={formData.name} onChange={handleInputChange} readOnly={!isEditing} /></FormGroup></Col>
                      <Col lg="6"><FormGroup><label>Email</label><Input type="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} /></FormGroup></Col>
                    </Row>
                    <Row>
                      <Col lg="6"><FormGroup><label>Timezone</label><Input type="select" name="timezone" value={formData.timezone} onChange={handleInputChange} disabled={!isEditing}>{timeZones.map(tz => <option key={tz} value={tz}>{tz}</option>)}</Input></FormGroup></Col>
                      <Col lg="6"><FormGroup><label>Description</label><Input type="textarea" name="description" value={formData.description} onChange={handleInputChange} readOnly={!isEditing} /></FormGroup></Col>
                    </Row>
                  </div>
                  <h6 className="heading-small text-muted mb-4">Operational Hours</h6>
                  {Object.keys(formData.operational_hours).map((day) => (
                    <Row key={day} className="my-2">
                      <Col lg="4"><label>{day}:</label></Col>
                      <Col lg="4"><Input type="select" value={formData.operational_hours[day].open} onChange={(e) => handleOperationalHoursChange(day, "open", e.target.value)} disabled={!isEditing}>{timeSlots.map((time) => (<option key={time} value={time}>{time}</option>))}</Input></Col>
                      <Col lg="4"><Input type="select" value={formData.operational_hours[day].close} onChange={(e) => handleOperationalHoursChange(day, "close", e.target.value)} disabled={!isEditing}>{timeSlots.map((time) => (<option key={time} value={time}>{time}</option>))}</Input></Col>
                    </Row>
                  ))}
                  {isEditing && <Button color="primary" type="submit">Save</Button>}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

//  return (
//     <>
//       <UserHeader />
//       <Container className="mt--7" fluid>
//         <Row>
//           <Col xl="4">
//             <Card className="card-profile shadow sticky-top">
//               <CardBody className="pt-0 pt-md-4">
//                 <div className="">
//                   <ul className="list-unstyled">
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Company Profiles
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Agents
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Call Logs
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Booking Calendar
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col xl="8">
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Company Profiles</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => setIsEditing(true)}
//                       size="sm"
//                     >
//                       Edit
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody className="d-flex">
//                 <Col lg="12" xl="6">
//                     <Card className="card-stats mb-4 mb-xl-0">
//                         <CardBody>
//                             <Row>
//                             <div className="col">
//                                 <CardTitle
//                                 tag="h2"
//                                 className="text-uppercase font-weight-bold mb-0"
//                                 >
//                                 Company_Name
//                                 </CardTitle>
//                             </div>
//                             <Col className="col-auto">
//                                 <div className="company_logo icon icon-shape bg-danger text-white rounded-circle shadow">
//                                   <i className="fas fa-chart-bar" />
//                                 </div>
//                             </Col>
//                             </Row>
//                             <p className="mt-3 mb-0 text-sm">
//                                 <a href="#">
//                                   View Company Details
//                                 </a>
//                             </p>
//                         </CardBody>
//                     </Card>
//                 </Col>
//                 <Col lg="12" xl="6">
//                     <Card className="card-stats mb-4 mb-xl-0">
//                         <CardBody>
//                             <Row>
//                             <div className="col">
//                                 <CardTitle
//                                 tag="h2"
//                                 className="text-uppercase font-weight-bold mb-0"
//                                 >
//                                 Company_Name2
//                                 </CardTitle>
//                             </div>
//                             <Col className="col-auto">
//                                 <div className="company_logo icon icon-shape bg-danger text-white rounded-circle shadow">
//                                   <i className="fas fa-chart-bar" />
//                                 </div>
//                             </Col>
//                             </Row>
//                             <p className="mt-3 mb-0 text-sm">
//                                 <a href="#">
//                                   View Company Details
//                                 </a>
//                             </p>
//                         </CardBody>
//                     </Card>
//                 </Col>   
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Company Profile</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Edit
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                   <h6 className="heading-small text-muted mb-4">
//                     Company Information
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row className="my-4">
//                       <Col lg="12">
//                         <div>
//                           <div className="form-control-label">
//                             Company_Name
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             company_name@email.com
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             (555) 123-4567
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="9">
//                         <div>
//                           <div className="form-control-label">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="3">
//                           <div className="company_logo rounded-circle shadow">
//                             <img
//                               alt="..."
//                               className="rounded-circle img-fluid mx-auto"
//                               src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                             />
//                           </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Company Address
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <div>
//                           <div className="form-control-label">
//                             Suite 11 - 123 StreetName Blvd., CityName, StateName, CountryName, ZipCode
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Operating Hours
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row className="my-4">
//                       <Col lg="12">
//                         <div>
//                           <div className="align-items-center d-flex mb-2">
//                             <div>Time Zone:</div>
//                             <div className="form-control-label px-2">
//                                 UTC-5
//                             </div>
//                           </div>
//                           <div className="text-xs">Current time is: 14:36:34</div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Monday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Tuesday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Wednesday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Thursday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Friday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Saturday:</div>
//                           <div className="form-control-label px-2">
//                             9:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             15:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Sunday:</div>
//                           <div className="form-control-label px-2">
//                             10:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             15:00
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Edit Company Profile</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Update
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <h6 className="heading-small text-muted mb-4">
//                     Company Information
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccName"
//                           >
//                             Company Name
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccName"
//                             placeholder="Company Name"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccEmail"
//                           >
//                             Company Email
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccEmail"
//                             placeholder="Email"
//                             type="email"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccPhone"
//                           >
//                             Company Phone Number
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccPhone"
//                             placeholder="Phone Number"
//                             type="tel"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccDescription"
//                           >
//                             Company Description
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccDescription"
//                             placeholder="Add a custom bio..."
//                             type="textarea"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccWebsite"
//                           >
//                             Company Website
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccWebsite"
//                             placeholder="https://your_website.com"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <div className="input-group b-flex align-items-center mb-3">
//                             <div className="form-control-label pr-2">
//                               Company Logo
//                             </div>
//                             <input type="file" className="form-control-alternative" id="ccLogoFile" />
//                             <label className="input-group-text" for="ccLogoFile">Upload</label>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Company Address
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccAddress1"
//                           >
//                             Street Address
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccAddress1"
//                             placeholder="Address number and street name"
//                             type="text"
//                           />
//                         </FormGroup>
//                         <FormGroup>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccAddress2"
//                             placeholder="Apartment, suite, unit, etc. (optional)"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccCity"
//                           >
//                             Town / City
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccCity"
//                             placeholder="City"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccStateProv"
//                           >
//                             State / Province
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccStateProv"
//                             placeholder="State / Province"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccCountry"
//                           >
//                             Country
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccCountry"
//                             placeholder="Country"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="ccZipPostal"
//                           >
//                             Zip / Postal Code
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="ccZipPostal"
//                             placeholder="Zip / Postal Code"
//                             type="email"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Operating Hours
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text" for="ccTimeZone">Time Zone</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccTimeZone">
//                                 <option selected>Choose one</option>
//                                 <option value="1">UTC-0</option>
//                                 <option value="2">UTC-1</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                           <span className="text-xs">Default Time Zone is set to UTC-0</span>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Monday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccMondayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccMondayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Tuesday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccTuesdayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccTuesdayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Wednesday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccWednesdayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccWednesdayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Thursday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccThursdayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccThursdayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Friday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccFridayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccFridayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Saturday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccSaturdayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccSaturdayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Sunday</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccSundayOpen">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="ccSundayClose">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                 </Form>
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Agents</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Add New
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody className="d-flex">
//                 <Col lg="12" xl="6">
//                     <Card className="card-stats mb-4 mb-xl-0">
//                         <CardBody>
//                             <Row>
//                             <div className="col">
//                               <CardTitle
//                               tag="h2"
//                               className="text-uppercase font-weight-bold mb-0"
//                               >
//                               Sara Doe
//                               </CardTitle>
//                               <div>
//                                 <Badge color="" className="badge-dot">
//                                     <i className="bg-success" />
//                                     Active
//                                 </Badge>
//                               </div>
//                             </div>
//                             <Col className="col-auto">
//                               <div className="company_logo avatar avatar-lg rounded-circle shadow">
//                                 <img
//                                   alt="..."
//                                   className="rounded-circle"
//                                   src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                                 />
//                               </div>
//                             </Col>
//                             </Row>
//                             <p className="mt-3 mb-0 text-sm">
//                               <a href="#">
//                                 View Agent Details
//                               </a>
//                             </p>
//                         </CardBody>
//                     </Card>
//                 </Col>
//                 <Col lg="12" xl="6">
//                     <Card className="card-stats mb-4 mb-xl-0">
//                         <CardBody>
//                             <Row>
//                             <div className="col">
//                                 <CardTitle
//                                 tag="h2"
//                                 className="text-uppercase font-weight-bold mb-0"
//                                 >
//                                 John Doe
//                                 </CardTitle>
//                             </div>
//                             <Col className="col-auto">
//                                 <div className="company_logo avatar avatar-lg rounded-circle shadow">
//                                   <img
//                                     alt="..."
//                                     className="rounded-circle"
//                                     src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                                   />
//                                 </div>
//                             </Col>
//                             </Row>
//                             <p className="mt-3 mb-0 text-sm">
//                                 <a href="#">
//                                   View Agent Details
//                                 </a>
//                             </p>
//                         </CardBody>
//                     </Card>
//                 </Col>
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Agent Profile</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Edit
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                   <div className="d-flex justify-content-between mb-4">
//                     <div>
//                       <h6 className="heading-small text-muted">
//                         Agent Information
//                       </h6>
//                     </div>
//                     <div>
//                       <div className="form-check form-switch">
//                         <input className="form-check-input" type="checkbox" role="switch" id="agOnOff" checked />
//                         <label className="form-check-label" for="agOnOff">
//                           <Badge color="" className="badge-dot">
//                             <i className="bg-success" />
//                             Active
//                           </Badge>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pl-lg-4">
//                     <Row className="my-4">
//                       <Col lg="12">
//                         <div>
//                           <div className="form-control-label">
//                             Sara Doe
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             sara_doe@email.com
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             (555) 123-4567
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="9">
//                         <div>
//                           <div className="form-control-label">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="3">
//                           <div className="company_logo rounded-circle shadow">
//                             <img
//                               alt="..."
//                               className="rounded-circle img-fluid mx-auto"
//                               src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                             />
//                           </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Agent Language Information
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row className="my-4">
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             Laguage
//                           </div>
//                           <div>
//                             English (US)
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             Voice Selected
//                           </div>
//                           <div>
//                             Option 1 (Female)
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="6">
//                         <div>
//                           <div className="form-control-label">
//                             Accent
//                           </div>
//                           <div>
//                             American (USA)
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Company Assigned To
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <div>
//                           <div className="form-control-label">
//                             Company_Name
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Working Hours
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row className="my-4">
//                       <Col lg="12">
//                         <div>
//                           <div className="align-items-center d-flex mb-2">
//                             <div>Time Zone:</div>
//                             <div className="form-control-label px-2">
//                                 UTC-5
//                             </div>
//                           </div>
//                           <div className="text-xs">Current time is: 14:36:34</div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4">
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Monday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Tuesday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Wednesday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Thursday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Friday:</div>
//                           <div className="form-control-label px-2">
//                             8:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             17:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Saturday:</div>
//                           <div className="form-control-label px-2">
//                             9:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             15:00
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="12" className="my-2">
//                         <div className="d-flex align-items-center">
//                           <div>Sunday:</div>
//                           <div className="form-control-label px-2">
//                             10:00
//                           </div>
//                           <div>-</div>
//                           <div className="form-control-label px-2">
//                             15:00
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Edit Agent Profile</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Update
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <h6 className="heading-small text-muted mb-4">
//                     Agent Information
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="agStatus"
//                             >
//                               Status
//                             </label>
//                             <select className="form-control-alternative form-control" id="agStatus">
//                                 <option selected>Choose one...</option>
//                                 <option value="1">Active</option>
//                                 <option value="2">Pending</option>
//                                 <option value="2">Offline</option>
//                                 <option value="3">...</option>
//                             </select>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="agFirstName"
//                           >
//                             First Name
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="agFirstName"
//                             placeholder="First Name"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="agLastName"
//                           >
//                             Last Name
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="agLastName"
//                             placeholder="Last Name"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="agBio"
//                           >
//                             Agent Bio
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="agBio"
//                             placeholder="Add a custom bio..."
//                             type="textarea"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group b-flex align-items-center mb-3">
//                             <div className="form-control-label pr-2">
//                               Profile Photo
//                             </div>
//                             <input type="file" className="form-control-alternative" id="agProfileImg" />
//                             <label className="input-group-text" for="agProfileImg">Upload</label>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Voice & Language Options
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="agLanguage"
//                             >
//                               Language
//                             </label>
//                             <select className="form-control-alternative form-control" id="agLanguage">
//                                 <option selected>Select one...</option>
//                                 <option value="1">English</option>
//                                 <option value="2">Spanish</option>
//                                 <option value="2">French</option>
//                                 <option value="2">Hindi</option>
//                                 <option value="2">Mandarin</option>
//                                 <option value="3">...</option>
//                             </select>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="agVoice"
//                             >
//                               Voice
//                             </label>
//                             <select className="form-control-alternative form-control" id="agVoice">
//                                 <option selected>Select one...</option>
//                                 <option value="1">Vocie 1 (Female)</option>
//                                 <option value="2">Voice 2 (Male)</option>
//                                 <option value="3">...</option>
//                             </select>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                             <label
//                               className="form-control-label"
//                               htmlFor="agAccent"
//                             >
//                               Voice
//                             </label>
//                             <select className="form-control-alternative form-control" id="agAccent">
//                                 <option selected>Select one...</option>
//                                 <option value="1">American (USA)</option>
//                                 <option value="2">British (UK)</option>
//                                 <option value="2">Indian (INDIA)</option>
//                                 <option value="3">...</option>
//                             </select>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Agent &#10238; Company
//                   </h6>
//                   <p>Assign an Agent to one or several companies.</p>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="btn-group" role="group" aria-label="Assign Agent to Companies">
//                             <input type="checkbox" className="btn-check" id="btncheck1" />
//                             <label className="btn btn-outline-primary" for="btncheck1">Company_Name</label>

//                             <input type="checkbox" className="btn-check" id="btncheck2" />
//                             <label className="btn btn-outline-primary" for="btncheck2">Company_Name1</label>

//                             <input type="checkbox" className="btn-check" id="btncheck3" />
//                             <label className="btn btn-outline-primary" for="btncheck3">Company_Name2</label>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Working Hours
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text" for="agTimeZone">Time Zone</label>
//                             <select className="form-control-alternative form-control mx-2" id="ccTimeZone">
//                                 <option selected>Choose one</option>
//                                 <option value="1">UTC-0</option>
//                                 <option value="2">UTC-1</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                           <span className="text-xs">Default Time Zone is set to UTC-0</span>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Monday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agMondayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agMondayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Tuesday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agTuesdayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agTuesdayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Wednesday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agWednesdayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agWednesdayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Thursday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agThursdayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agThursdayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Friday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agFridayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agFridayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Saturday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agSaturdayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agSaturdayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="12">
//                         <FormGroup>
//                           <div className="input-group">
//                             <label className="input-group-text">Sunday</label>
//                             <select className="form-control-alternative form-control mx-2" id="agSundayStart">
//                                 <option selected>Select opening time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                             <select className="form-control-alternative form-control mx-2" id="agSundayEnd">
//                                 <option selected>Select closing time</option>
//                                 <option value="1">00:00</option>
//                                 <option value="2">00:30</option>
//                                 <option value="3">01:00</option>
//                                 <option value="3">01:30</option>
//                                 <option value="3">02:00</option>
//                                 <option value="3">02:30</option>
//                                 <option value="3">03:00</option>
//                                 <option value="3">03:30</option>
//                                 <option value="3">...</option>
//                             </select>
//                           </div>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                 </Form>
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Call Logs</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <div>
//                       <h6 className="heading-small text-muted mb-1">304 / 4000 minutes</h6>
//                       <p className="text-sm">Add more minutes</p>
//                     </div>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Call ID</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">Minutes</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Agent</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             <a href="#">
//                               Call #123456
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>2025-01-27 08:26:49</td>         
//                     <td>
//                       <div className="time-amount">
//                         04:12:34 m
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-success" />
//                         Live
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip996637554"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip996637554"
//                         >
//                           Sara Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-angle-down" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             View Call Log
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Archive Call Log
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             <a href="#">
//                               Call #123456
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>2025-01-27 08:26:49</td>         
//                     <td>
//                       <div className="time-amount">
//                         11:12:34 m
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-success" />
//                         Completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip996637554"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip996637554"
//                         >
//                           Sara Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-angle-down" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             View Call Log
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Archive Call Log
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             <a href="#">
//                               Call #123456
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>2025-01-27 08:26:49</td>         
//                     <td>
//                       <div className="time-amount">
//                         00:00:00 m
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-danger" />
//                         Failed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip996637554"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip996637554"
//                         >
//                           Sara Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-angle-down" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             View Call Log
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Archive Call Log
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
//                 <div className="d-flex justify-content-between">
//                 <div>
//                   <h6 className="heading-small text-muted mb-1">Lifetime Minutes</h6>
//                   <p className="text-sm">1245 m</p>
//                 </div>
//                 <nav aria-label="...">
//                   <Pagination
//                     className="pagination justify-content-end mb-0"
//                     listClassName="justify-content-end mb-0"
//                   >
//                     <PaginationItem className="disabled">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                         tabIndex="-1"
//                       >
//                         <i className="fas fa-angle-left" />
//                         <span className="sr-only">Previous</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem className="active">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         1
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         2 <span className="sr-only">(current)</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         3
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="fas fa-angle-right" />
//                         <span className="sr-only">Next</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                   </Pagination>
//                 </nav>
//                 </div>
//               </CardFooter>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

export default Centers;
