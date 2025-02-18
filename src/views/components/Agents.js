import React, { useState, useEffect } from "react";
import classnames from "classnames";
import {
  Button,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
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
  NavItem,
  NavLink,
  Nav,
  UncontrolledTooltip,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase-config";
import api from "../../services/api";
import { useTime } from "../../context/TimeContext";

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

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
    timezone: "UTC+00:00",  //Will be updated dynamically
    description: "",
    useCompanyHours: false,
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
  const { formattedTime, timezone } = useTime();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        // Get both agents and client data
        const [agentsResponse, clientResponse] = await Promise.all([
          api.get(`/clients/${currentUser.uid}/agents`),
          api.get(`/clients/${currentUser.uid}`)
        ]);
        
        const client = clientResponse.data.data;
        console.log('Client data:', client); // Debug log
        
        // Merge client data with each agent
        const agentsWithClient = agentsResponse.data.map(agent => ({
          ...agent,
          client: {
            name: client.name,
            operational_hours: client.operational_hours || {
              Monday: { open: "", close: "" },
              Tuesday: { open: "", close: "" },
              Wednesday: { open: "", close: "" },
              Thursday: { open: "", close: "" },
              Friday: { open: "", close: "" },
              Saturday: { open: "", close: "" },
              Sunday: { open: "", close: "" },
            }
          }
        }));
        
        console.log('Agents with client:', agentsWithClient); // Debug log
        setAgents(agentsWithClient);
        setError(null);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load agents');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchAgents();
    }
  }, [currentUser]);

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="4">
            <Card className="card-profile shadow mb-4">
              <CardBody className="pt-4">
                <div>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#" className="d-flex icon-link px-4 py-2">
                        Agents
                      </a>
                    </li>
                    <li>
                      <div className="d-flex icon-link px-4 py-2">
                        Agent Training (coming soon)
                      </div>
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
                    <Col xs="6">
                      <h3 className="mb-0">Agents</h3>
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
              <Table className="align-items-center table-flush table-secondary table-striped table-hover" responsive>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Voice</th>
                    <th scope="col">Personality</th>
                    <th scope="col">Calls</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Loading agents...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="text-center text-danger">
                        {error}
                      </td>
                    </tr>
                  ) : agents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No agents found
                      </td>
                    </tr>
                  ) : (
                    agents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((agent) => (
                      <tr key={agent.id}>
                        <th scope="row">
                          <div>
                          <img
                              alt={selectedAgent?.name || "Agent"}
                              className="rounded-circle img-fluid mx-auto"
                              src={selectedAgent?.photo_url ? `${process.env.REACT_APP_API_URL}${selectedAgent.photo_url}` : require("../../assets/img/theme/team-4-800x800.jpg")}
                            />
                          </div>
                        </th>
                        <th scope="row">
                          <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                              <a href="#" onClick={(e) => {
                                e.preventDefault();
                                setSelectedAgent(agent);
                              }}>{agent.custom_parameters?.agent_name}</a>
                            </span>
                          </Media>
                        </th>
                        <td>
                          <div>
                            <div>{agent.voice_config?.name || 'N/A'}</div>
                            <small className="text-muted">
                              {agent.voice_config?.language_code || 'N/A'} ({agent.voice_config?.ssml_gender || 'N/A'})
                            </small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div>{agent.custom_parameters?.agent_persona || 'N/A'}</div>
                            <small className="text-muted">
                              {agent.custom_parameters?.speaking_style || 'N/A'}
                            </small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div>{agent.total_calls_handled || 0} total</div>
                            <small className="text-muted">
                              Last: {agent.last_call_time ? new Date(agent.last_call_time).toLocaleString() : 'Never'}
                            </small>
                          </div>
                        </td>
                        <td>
                          <Badge color="" className="badge-dot">
                            <i className={`bg-${agent.status === 'available' ? 'success' : agent.status === 'busy' ? 'warning' : 'danger'}`} />
                            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                          </Badge>
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedAgent(agent);
                                }}
                              >
                                View Agent Details
                              </DropdownItem>
                              <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                View Agent Call Log
                              </DropdownItem>
                              <DropdownItem
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Delete Agent
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              {agents.length > itemsPerPage && (
                <CardFooter className="py-4">
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col md="5" className="text-sm mb-3 mb-md-0">
                      Showing <strong>{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, agents.length)}</strong> of {agents.length}
                    </Col>
                    <Col md="7">
                      <nav aria-label="...">
                        <Pagination
                          className="pagination justify-content-end mb-0"
                          listClassName="justify-content-end mb-0"
                        >
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(prev => Math.max(prev - 1, 1));
                              }}
                              tabIndex="-1"
                            >
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          {[...Array(Math.ceil(agents.length / itemsPerPage))].map((_, i) => (
                            <PaginationItem key={i + 1} active={currentPage === i + 1}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(i + 1);
                                }}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem disabled={currentPage === Math.ceil(agents.length / itemsPerPage)}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(prev => Math.min(prev + 1, Math.ceil(agents.length / itemsPerPage)));
                              }}
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
              )}
            </Card>
            {/* View Agent Profile */}
            {selectedAgent && (
              <>
                <hr className="my-4" />
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="6">
                        <h3 className="mb-0">{selectedAgent ? `${selectedAgent.custom_parameters?.agent_name}'s Profile` : 'Agent Profile'}</h3>
                      </Col>
                      <Col xs="6" className="d-flex justify-content-end">
                        <div>
                          <Button color="primary" size="sm" onClick={() => setIsEditing(true)}>
                            Edit
                          </Button>
                        </div>
                        <div className="ml-2">
                          <Button color="light" size="sm" onClick={() => setSelectedAgent(null)}>
                            Close
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex justify-content-between mb-4">
                      <div>
                        <h6 className="heading-small text-muted">
                          Agent Information
                        </h6>
                      </div>
                      <div>
                        <Badge color="" className="badge-dot">
                          <i className={`bg-${selectedAgent?.status === 'available' ? 'success' : selectedAgent?.status === 'busy' ? 'warning' : 'danger'}`} />
                          {selectedAgent ? selectedAgent.status.charAt(0).toUpperCase() + selectedAgent.status.slice(1) : 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    <div className="pl-lg-4">
                      <Row className="my-4 align-items-center">
                        <Col lg="9">
                          <Row>
                            <Col lg="6" className="mb-3 mb-lg-4">
                              <div className="form-control-label">
                                Name
                              </div>
                              <div>
                                {selectedAgent?.custom_parameters?.agent_name || 'N/A'}
                              </div>
                            </Col>
                            <Col lg="6" className="mb-3 mb-lg-4">
                              <div className="form-control-label">
                                Active Since
                              </div>
                              <div>
                                {selectedAgent?.active_since ? new Date(selectedAgent.active_since).toLocaleDateString() : 'N/A'}
                              </div>
                            </Col>
                          </Row>
                          <div className="form-control-label">
                            {selectedAgent?.custom_parameters?.bio || 'No bio available.'}
                          </div>
                        </Col>
                        <Col lg="3" className="px-6 mt-4 px-lg-0 mt-lg-0">
                          <div className="company_logo p-3 p-lg-2 rounded-circle shadow">
                            <img
                              alt={selectedAgent?.name || "Agent"}
                              className="rounded-circle img-fluid mx-auto"
                              src={selectedAgent?.photo_url ? `${process.env.REACT_APP_API_URL}${selectedAgent.photo_url}` : require("../../assets/img/theme/team-4-800x800.jpg")}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Company Assigned To
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <div>
                            <div className="form-control-label">
                              {selectedAgent?.client?.name ? (
                                <a 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/admin/call-centers');
                                  }}
                                  className="text-primary"
                                >
                                  {selectedAgent.client.name}
                                </a>
                              ) : (
                                <span className="text-muted">No company assigned</span>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Working Hours
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6" className="mb-3 mb-lg-4">
                          <div>
                            <div className="align-items-center d-flex mb-2">
                              <div>Time Zone:</div>
                              <div className="form-control-label px-2">
                                {timezone}
                              </div>
                            </div>
                            <div className="text-xs">Current time is: {formattedTime}</div>
                          </div>
                        </Col>
                        <Col lg="6" className="mb-3 mb-lg-4">
                          {Object.entries(selectedAgent?.client?.operational_hours || {})
                            .sort((a, b) => {
                              const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                              return days.indexOf(a[0]) - days.indexOf(b[0]);
                            })
                            .map(([day, hours]) => (
                              <div key={day} className="d-flex align-items-center my-1">
                                <div style={{minWidth: '100px'}}>{day}:</div>
                                {hours?.open ? (
                                  <div className="d-flex align-items-center">
                                    <div className="form-control-label px-2">{hours.open}</div>
                                    <div className="px-2">-</div>
                                    <div className="form-control-label px-2">{hours.close}</div>
                                  </div>
                                ) : (
                                  <div className="form-control-label px-2 text-muted">Closed</div>
                                )}
                              </div>
                            ))}
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Agents;
