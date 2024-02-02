import { Button, Col, Form, Row } from "react-bootstrap"


export const Login = () => {
    return <Col lg={4} className="bg-body mx-auto my-5 py-3 rounded-3 shadow-sm">
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <div className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" required />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" required />
                    </div>
                    <div className="mb-3 d-grid">
                        <Button type="submit" variant="dark">
                            <i className="bi-box-arrow-in-right me-2"></i>Log In
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Col>
}