
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [userExists, setUserExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setFormData(userDoc.data());
            setUserExists(true);
          } else {
            // Populate formData from Google Auth
            const [firstName, ...lastNameParts] = currentUser.displayName
              ? currentUser.displayName.split(" ")
              : ["", ""];
            const lastName = lastNameParts.join(" ");
            setFormData({
              ...formData,
              firstName,
              lastName,
              email: currentUser.email || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, formData, { merge: true });
        alert("Profile updated successfully!");
        setUserExists(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          {/* Sidebar Cards */}
          <Col xl="4">
            <Card className="card-profile shadow sticky-top">
              <CardBody>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="d-flex icon-link px-4 py-2">
                      Account Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex icon-link px-4 py-2">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex icon-link px-4 py-2">
                      Billing Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex icon-link px-4 py-2">
                      Billing History
                    </a>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>

          {/* User Information Display Card */}
          {userExists && !isEditing && (
            <Col xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">User Profile</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={() => setIsEditing(true)}
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                        User Information
                      </h6>
                      <div className="pl-lg-4">
                        <Row className="my-4">
                          <Col lg="6">
                            <div>
                              <div className="form-control-label">
                                First Name
                              </div>
                              <div>
                                {formData.firstName}
                              </div>
                            </div>
                          </Col>
                          <Col lg="6">
                            <div>
                              <div className="form-control-label">
                                Last Name
                              </div>
                              <div>
                                {formData.lastName}
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
                                {formData.email}
                              </div>
                            </div>
                          </Col>
                          <Col lg="6">
                            <div>
                              <div className="form-control-label">
                                Phone Number
                              </div>
                              <div>
                                {formData.phone}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">
                        User Address
                      </h6>
                      <div className="pl-lg-4">
                        <Row className="my-4">
                          <Col lg="12">
                            <div>
                              <div className="form-control-label">
                                Address
                              </div>
                              <div>
                                {formData.address}
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
                                {formData.city}
                              </div>
                            </div>
                          </Col>
                          <Col lg="6">
                            <div>
                              <div className="form-control-label">
                                State / Province
                              </div>
                              <div>
                                {formData.state}
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
                                {formData.country}
                              </div>
                            </div>
                          </Col>
                          <Col lg="6">
                            <div>
                              <div className="form-control-label">
                                Zip / Postal Code
                              </div>
                              <div>
                                {formData.zip}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                  </CardBody>
              </Card>
            </Col>
          )}

          {/* Editable Form Card */}
          {(!userExists || isEditing) && (
            <Col xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit Profile</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleFormSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User Information
                    </h6>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h6 className="heading-small text-muted mb-4">
                      Address Information
                    </h6>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>State</label>
                          <Input
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label>Zip</label>
                          <Input
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                    {userExists && (
                      <Button
                        color="secondary"
                        onClick={() => setIsEditing(false)}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

//   /* return (
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
//                         Account Information
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Change Password
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Billing Information
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#" className="d-flex icon-link px-4 py-2">
//                         Billing History
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Container className="mt--7" fluid>
//             <Row>


//           {/* Display Card */}
//           {userExists && !isEditing && (
//             <Col xl="8">
//                 <Card className="bg-secondary shadow">
//                   <CardHeader className="bg-white border-0">
//                     <Row className="align-items-center">
//                       <Col xs="8">
//                         <h3 className="mb-0">{userExists || isEditing ? "Edit Account Profile" : "Create Account Profile"}</h3>
//                       </Col>
//                       <Col className="text-right" xs="4">
//                         <Button
//                           color="primary"
//                           href="#"
//                           onClick={(e) => setIsEditing(true)}
//                           size="sm"
//                         >
//                           Edit
//                         </Button>
//                       </Col>
//                     </Row>
//                   </CardHeader>
//                   <CardBody>
//                       <h6 className="heading-small text-muted mb-4">
//                         User Information
//                       </h6>
//                       <div className="pl-lg-4">
//                         <Row className="my-4">
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 First Name
//                               </div>
//                               <div>
//                                 {formData.firstName}
//                               </div>
//                             </div>
//                           </Col>
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 Last Name
//                               </div>
//                               <div>
//                                 {formData.lastName}
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                         <Row className="my-4">
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 Email
//                               </div>
//                               <div>
//                                 {formData.email}
//                               </div>
//                             </div>
//                           </Col>
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 Phone Number
//                               </div>
//                               <div>
//                                 {formData.phone}
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                       </div>
//                       <hr className="my-4" />
//                       <h6 className="heading-small text-muted mb-4">
//                         User Address
//                       </h6>
//                       <div className="pl-lg-4">
//                         <Row className="my-4">
//                           <Col lg="12">
//                             <div>
//                               <div className="form-control-label">
//                                 Address
//                               </div>
//                               <div>
//                                 {formData.address}
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                         <Row className="my-4">
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 City
//                               </div>
//                               <div>
//                                 {formData.city}
//                               </div>
//                             </div>
//                           </Col>
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 State / Province
//                               </div>
//                               <div>
//                                 {formData.state}
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                         <Row className="my-4">
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 Country
//                               </div>
//                               <div>
//                                 {formData.country}
//                               </div>
//                             </div>
//                           </Col>
//                           <Col lg="6">
//                             <div>
//                               <div className="form-control-label">
//                                 Zip / Postal Code
//                               </div>
//                               <div>
//                                 {formData.zip}
//                               </div>
//                             </div>
//                           </Col>
                          
//                         </Row>
//                       </div>
//                       <hr className="my-4" />
//                   </CardBody>
//                 </Card>
//               </Col>
//             )}

//             {(!userExists || isEditing) && (
//             <><hr className="my-4" /><Col xl="8">
//                   <Card className="bg-secondary shadow">
//                     <CardHeader className="bg-white border-0">
//                       <Row className="align-items-center">
//                         <Col xs="8">
//                           <h3 className="mb-0">Edit Profile</h3>
//                         </Col>
//                         <Col className="text-right" xs="4">
//                           <Button
//                             color="primary"
//                             href="#"
//                             onClick={(e) => e.preventDefault()}
//                             size="sm"
//                           >
//                             Update
//                           </Button>
//                         </Col>
//                       </Row>
//                     </CardHeader>
//                     <CardBody>
//                       <Form>
//                         <h6 className="heading-small text-muted mb-4">
//                           User Information
//                         </h6>
//                         <div className="pl-lg-4">
//                           <Row>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uFirstName"
//                                 >
//                                   First Name
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uFirstName"
//                                   placeholder="First Name"
//                                   value={formData.firstName}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uLastName"
//                                 >
//                                   Last Name
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uLastName"
//                                   placeholder="Last Name"
//                                   value={formData.lastName}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uEmail"
//                                 >
//                                   Email
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uEmail"
//                                   placeholder="Email"
//                                   value={formData.email}
//                                   onChange={handleInputChange}
//                                   type="email" />
//                               </FormGroup>
//                             </Col>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uPhone"
//                                 >
//                                   Phone Number
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uPhone"
//                                   placeholder="Phone Number"
//                                   value={formData.phone}
//                                   onChange={handleInputChange}
//                                   type="tel" />
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                         </div>
//                         <hr className="my-4" />
//                         <h6 className="heading-small text-muted mb-4">
//                           User Address
//                         </h6>
//                         <div className="pl-lg-4">
//                           <Row>
//                             <Col lg="12">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uAddress1"
//                                 >
//                                   Street Address
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uAddress1"
//                                   placeholder="House number and street name"
//                                   value={formData.address}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                               <FormGroup>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uAddress2"
//                                   placeholder="Apartment, suite, unit, etc. (optional)"
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uCity"
//                                 >
//                                   Town / City
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uCity"
//                                   placeholder="City"
//                                   value={formData.city}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uStateProv"
//                                 >
//                                   State / Province
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uStateProv"
//                                   placeholder="State / Province"
//                                   value={formData.state}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uCountry"
//                                 >
//                                   Country
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uCountry"
//                                   placeholder="Country"
//                                   value={formData.country}
//                                   onChange={handleInputChange}
//                                   type="text" />
//                               </FormGroup>
//                             </Col>
//                             <Col lg="6">
//                               <FormGroup>
//                                 <label
//                                   className="form-control-label"
//                                   htmlFor="uZipPostal"
//                                 >
//                                   Zip / Postal Code
//                                 </label>
//                                 <Input
//                                   className="form-control-alternative"
//                                   id="uZipPostal"
//                                   placeholder="Zip / Postal Code"
//                                   value={formData.zip}
//                                   type="postal" />
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <div className="btn-group" role="group" aria-label="Same address for billing">
//                               <input type="checkbox" className="btn-check" id="userAddressBilling" />
//                               <label className="btn btn-outline-primary" for="userAddressBilling">Use the same address as billing</label>
//                             </div>
//                           </Row>
//                         </div>
//                         <hr className="my-4" />
//                       </Form>
//                     </CardBody>
//                   </Card>
//                 </Col></>
//             )}
//             </Row>
//             </Container>
//             <hr className="my-4" />
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Account Password</h3>
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
//                     Update Password
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="uPass"
//                           >
//                             Current Password
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uPass"
//                             placeholder="Enter your current password"
//                             type="password"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="newPass"
//                           >
//                             New Password
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="newPass"
//                             placeholder="Enter a new password"
//                             type="password"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="newPass2"
//                           >
//                             Re-Enter New Password
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="newPass2"
//                             placeholder="Re-enter the new password"
//                             type="password"
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Google Auth Login
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <div>... add google auth login connection ...</div>
//                       </Col>
//                     </Row>
//                   </div>
//                 </Form>
//               </CardBody>
//             </Card>
//             <hr className="my-4" />
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Billing Information</h3>
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
//                     Credit Card Information
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label className="form-control-label" htmlFor="credit-card-number">Card Number</label>
//                           <input type="text" 
//                             className="form-control-alternative" 
//                             autoComplete="off" 
//                             autoCorrect="off"
//                             autoCapitalize="none" spellCheck="false"
//                             name="credit-card-number" 
//                             id="credit-card-number"
//                             maxLength="22" />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label className="form-control-label" htmlFor="expiration">Expiration Date</label>
//                           <input type="text" 
//                             autoComplete="off" 
//                             autoCorrect="off" 
//                             autoCapitalize="none"
//                             spellCheck="false" 
//                             className="form-control-alternative"
//                             name="expiration" 
//                             id="expiration"
//                             placeholder="MM / YYYY" 
//                             maxLength="7" />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label className="form-control-label" htmlFor="cvv">Security Code </label>
//                           <input type="text" 
//                             autoComplete="off" 
//                             autoCorrect="off" 
//                             autoCapitalize="none"
//                             spellCheck="false" 
//                             className="form-control-alternative"
//                             name="cvv" 
//                             id="cvv" 
//                             maxLength="4" />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label className="form-control-label" htmlFor="ccName">Name on the Credit Card</label>
//                           <input type="text" 
//                             className="form-control-alternative" 
//                             autoComplete="off" 
//                             autoCorrect="off"
//                             autoCapitalize="none" spellCheck="false"
//                             name="ccName" 
//                             id="ccName" />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Billing Address
//                   </h6>
//                   <div className="pl-lg-4">
//                     <Row>
//                       <div className="btn-group" role="group" aria-label="Same address as profile">
//                         <input type="checkbox" className="btn-check" id="userAddressBilling2" />
//                         <label className="btn btn-outline-primary" for="userAddressBilling2">Use the same address as profile</label>
//                       </div>
//                     </Row>
//                     <Row>
//                       <Col lg="12">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="uAddress1"
//                           >
//                             Street Address
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uAddress1"
//                             placeholder="House number and street name"
//                             type="text"
//                           />
//                         </FormGroup>
//                         <FormGroup>
//                           <Input
//                             className="form-control-alternative"
//                             id="uAddress2"
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
//                             htmlFor="uCity"
//                           >
//                             Town / City
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uCity"
//                             placeholder="City"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="uStateProv"
//                           >
//                             State / Province
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uStateProv"
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
//                             htmlFor="uCountry"
//                           >
//                             Country
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uCountry"
//                             placeholder="Country"
//                             type="text"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="uZipPostal"
//                           >
//                             Zip / Postal Code
//                           </label>
//                           <Input
//                             className="form-control-alternative"
//                             id="uZipPostal"
//                             placeholder="Zip / Postal Code"
//                             type="email"
//                           />
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
//                 <h3 className="mb-0">Billing History</h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Invoice ID</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">Status</th>
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
//                               Invoice #123453
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>Jan. 22, 2025</td>         
//                     <td>
//                       <div className="invoice-amount">
//                         $1,111.11
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-warning" />
//                         pending
//                       </Badge>
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
//                             View Invoice
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Download Invoice
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
//                               Invoice #123453
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>Jan. 20, 2025</td>         
//                     <td>
//                       <div className="invoice-amount">
//                         $1,111.11
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-success" />
//                         Approved
//                       </Badge>
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
//                             View Invoice
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Download Invoice
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
//                               Invoice #123453
//                             </a>
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>Jan. 20, 2025</td>         
//                     <td>
//                       <div className="invoice-amount">
//                         $1,111.11
//                       </div>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-danger" />
//                         Failed
//                       </Badge>
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
//                             View Invoice
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Download Invoice
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
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
//               </CardFooter>
//             </Card>
//             <hr className="my-4" />
//             <Card className="bg-secondary shadow">
//               <CardHeader className="bg-white border-0">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Invoice #123453</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       Print
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                   <div>
//                     <Row className="my-4 d-flex justify-content-between">
//                       <Col lg="4">
//                         <div>
//                           <div className="form-control-label">
//                             VoxLeads
//                           </div>
//                           <div>
//                             <p>Embankment, 050105 Bucharest, Romania</p>
//                             <p>tel: +4 (074) 1090873</p>
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="4" className="text-right">
//                         <div>
//                           <div className="form-control-label">
//                             Billed to: John Doe
//                           </div>
//                           <div>
//                             <p className="mb-0">4006 Locust View Drive</p>
//                             <p className="mb-0">San Francisco CA</p>
//                             <p className="mb-0">California</p>
//                             <p className="mb-0">90210</p>
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                     <Row className="my-4 d-flex justify-content-between">
//                       <Col lg="4">
//                         <div>
//                           <div className="form-control-label">
//                             Invoice #
//                           </div>
//                           <div>
//                             123453
//                           </div>
//                         </div>
//                       </Col>
//                       <Col lg="4" className="text-right">
//                         <div>
//                           <div className="form-control-label">
//                             Invoice Date
//                           </div>
//                           <div>
//                             2025-01-27
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </div>
//                   <hr className="my-4" />
//                   <h6 className="heading-small text-muted mb-4">
//                     Invoice Summary
//                   </h6>
//                   <Table className="align-items-center table-flush" responsive>
//                     <thead className="thead-light">
//                       <tr>
//                         <th scope="col">Item</th>
//                         <th scope="col">Qty</th>
//                         <th scope="col">Rate</th>
//                         <th scope="col">Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <th scope="row">
//                         <Media className="align-items-center">
//                           <span className="mb-0 text-sm">
//                             Agent minutes
//                           </span>
//                         </Media>
//                         </th>
//                         <td>4000</td>         
//                         <td>
//                         <div className="invoice-qty">
//                             $0.09 / m
//                         </div>
//                         </td>
//                         <td>
//                         <div className="invoice-amount">
//                             $360
//                         </div>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                         <Media className="align-items-center">
//                             <span className="mb-0 text-sm">
//                             Agent (3 pack)
//                             </span>
//                         </Media>
//                         </th>
//                         <td>1</td>         
//                         <td>
//                         <div className="invoice-qty">
//                             $11.99 / mo
//                         </div>
//                         </td>
//                         <td>
//                         <div className="invoice-amount">
//                             $11.99
//                         </div>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                         <Media className="align-items-center">
//                             <span className="mb-0 text-sm">
//                             Agent (single)
//                             </span>
//                         </Media>
//                         </th>
//                         <td>1</td>         
//                         <td>
//                         <div className="invoice-qty">
//                             $5.99 / mo
//                         </div>
//                         </td>
//                         <td>
//                         <div className="invoice-amount">
//                             $5.99
//                         </div>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                          &nbsp;
//                         </th>
//                         <td>&nbsp;</td>         
//                         <td>
//                         <div className="text-xl font-weight-bold">
//                             Total
//                         </div>
//                         </td>
//                         <td>
//                         <div className="text-xl font-weight-bold">
//                             $377.98
//                         </div>
//                         </td>
//                     </tr>
//                     </tbody>
//                   </Table>
//                   <hr className="my-4" />
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }; */

export default Profile;
