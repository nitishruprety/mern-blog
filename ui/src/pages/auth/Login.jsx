import { Button, Col, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import http from "../../http"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../store/user.slice"


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            http.post('/login', values)
                .then(response => {
                    localStorage.setItem('token', response.data.token)

                    return http.get('/auth/user')
                })
                .then(response => {
                    dispatch(setUser(response.data))
                    navigate('/cms/dashboard')
                })
                .catch(err => {})
        }
    })

    return <Col lg={4} className="bg-body mx-auto my-5 py-3 rounded-3 shadow-sm">
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" required onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.email && formik.errors.email} />
                        {formik.touched.email && formik.errors.email && <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>}
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" required onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.password && formik.errors.password} />
                        {formik.touched.password && formik.errors.password && <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>}
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