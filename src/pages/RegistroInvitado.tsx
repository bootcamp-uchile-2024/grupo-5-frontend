import { MainLayout } from "../layout/MainLayout";
import ShoppingCart from "../assets/icons/shopping-cart.svg";
import Location from "../assets/icons/Location.svg";
import Location2 from "../assets/icons/Location2.svg";
import Caja from "../assets/icons/Caja.svg";
import Pago from "../assets/icons/dollar-alt.svg";
import Chevron from "../assets/icons/chevron-right.svg";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import styles from "./css/RegistroInvitado.module.css";
import { Link, useNavigate } from "react-router-dom";
import GatoRegistro from "../assets/RegistroUsuario/registrarme.png";
import { useEffect, useState } from "react";
import { Region } from "../interface/Usuarios/Region";
import { Comuna } from "../interface/Usuarios/Comuna";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { saveForm } from "../states/formSlice";

const { Formik } = formik;

const schema = yup.object().shape({
  nombre: yup.string().required(),
  apellidos: yup.string().required(),
  rut: yup.string().required(),
  correo: yup.string().email("Correo inválido").required(),
  telefono: yup.string().required(),
  region: yup.string().required(),
  comuna: yup.string().required(),
  direccion: yup.string().required(),
  numero: yup.string().required(),
  alias: yup.string().required(),
});

export const RegistroInvitado = () => {
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegiones = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/region`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setRegiones(data);
      } catch (error) {
        console.error("Error al obtener las regiones:", error);
      }
    };

    fetchRegiones();
  }, []);

  const handleRegionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    handleChange: (e: React.ChangeEvent<any>) => void
  ) => {
    const { value } = e.target;
    handleChange(e);
    if (value) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/comuna/region/${value}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setComunas(data);
      } catch (error) {
        console.error("Error al obtener las comunas:", error);
      }
    } else {
      setComunas([]);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response1 = await fetch(
        `${import.meta.env.VITE_API_URL}/usuarios/registrar/invitado`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rutUsuario: values.rut,
            nombres: values.nombre,
            apellidos: values.apellidos,
            correoElectronico: values.correo,
            telefono: values.telefono,
          }),
        }
      );

      if (!response1.ok) {
        throw new Error("Error en el registro del usuario invitado");
      }

      const data1 = await response1.json();
      const idUsuario = data1.idUsuario;
      console.log("ID Usuario:", idUsuario);

      const direccionData = {
        idUsuario: idUsuario,
        idComuna: Number(values.comuna),
        calle: values.direccion,
        numero: values.numero,
        referencias: values.referencias,
        alias: values.alias,
      };

      console.log("Datos enviados a la API de dirección:", direccionData);

      const response2 = await fetch(
        `${import.meta.env.VITE_API_URL}/direccion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(direccionData),
        }
      );

      if (!response2.ok) {
        const errorData = await response2.json();
        throw new Error(
          `Error en el registro de la dirección: ${errorData.message}`
        );
      }

      dispatch(saveForm({ ...values, idUsuario }));

      navigate("/resumen-carrito", {
        state: { ...values, idUsuario, source: "RegistroInvitado" },
      });

      console.log("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar el usuario invitado:", error);
    }
  };

  return (
    <MainLayout>
      <Container fluid>
        <div className={styles.customContainer}>
          <h1 className={styles.titulo}>Dirección</h1>
          <Row className="d-flex justify-content-center">
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center `}
            >
              <div className={styles.icons}>
                <img src={ShoppingCart} alt="shopping-cart-img" />
              </div>
              <span className={styles.iconText}>Carrito de compra</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.iconLocation}>
                <img src={Location} alt="Location-img" />
              </div>
              <span className={styles.iconText}>Dirección</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Caja} alt="Caja-img" />
              </div>
              <span className={styles.iconText}>Resumen</span>
            </Col>
            <Col
              xs={6}
              md={1}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <img
                src={Chevron}
                alt="chevron-right-img"
                className={styles.chevron}
              />
            </Col>
            <Col
              xs={6}
              md={2}
              className={`${styles.iconContainer} d-flex justify-content-center mb-3`}
            >
              <div className={styles.icons}>
                <img src={Pago} alt="Pago-img" />
              </div>
              <span className={styles.iconText}>Pago</span>
            </Col>
          </Row>
        </div>

        <Row className="d-flex justify-content-center pb-4">
          <Col
            xs={10}
            md={10}
            style={{ borderBottom: "1px solid #BFBFBF" }}
          ></Col>
        </Row>

        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            nombre: "",
            rut: "",
            correo: "",
            apellidos: "",
            telefono: "",
            region: "",
            comuna: "",
            direccion: "",
            numero: "",
            referencias: "",
            alias: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            touched,
            values,
            errors,
            validateForm,
          }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                validateForm().then(() => handleSubmit(e));
              }}
            >
              <Row className="d-flex justify-content-center">
                <Col xs={12} md={4}>
                  <Container
                    fluid
                    style={{
                      backgroundColor: "#DFF4D2",
                      borderRadius: "20px",
                      width: "445px",
                      height: "188px",
                      padding: "10px 15px",
                      position: "relative",
                    }}
                  >
                    <div className={styles.contenedorParrafo}>
                      <p className={styles.parrafo2}>
                        ¡Haz tu compra más fácil la próxima vez!
                      </p>
                      <p className={styles.parrafo5}>
                        Regístrate ahora y guarda tus direcciones de entrega
                        para futuras compras. Así, completar tu pedido será más
                        rápido y sencillo.
                      </p>
                    </div>

                    <Link to="/registro">
                      <Button
                        variant="warning"
                        style={{
                          width: "133px",
                          height: "40px",
                          borderRadius: "32px",
                          color: "#363636",
                          fontSize: "16px",
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                          marginLeft: "30%",
                          marginTop: "5px",
                        }}
                      >
                        Registrate
                      </Button>
                    </Link>
                    <img
                      src={GatoRegistro}
                      alt="GatoRegistro"
                      className={styles.gatoRegistro}
                    />
                  </Container>

                  <p className={styles.datos}>Mis datos</p>

                  <Form.Group
                    as={Row}
                    controlId="formNombre"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Nombre
                    </Form.Label>
                    <Col sm={9} className="position-relative">
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        isValid={touched.nombre && !errors.nombre}
                        isInvalid={!!errors.nombre}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formApellidos"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Apellidos
                    </Form.Label>
                    <Col sm={9} className="position-relative">
                      <Form.Control
                        type="text"
                        name="apellidos"
                        value={values.apellidos}
                        onChange={handleChange}
                        isValid={touched.nombre && !errors.nombre}
                        isInvalid={!!errors.nombre}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formHorizontalRut"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Rut
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="rut"
                        value={values.rut}
                        onChange={handleChange}
                        isValid={touched.rut && !errors.rut}
                        isInvalid={!!errors.rut}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formHorizontalEmail"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Correo
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="email"
                        name="correo"
                        value={values.correo}
                        onChange={handleChange}
                        isValid={touched.correo && !errors.correo}
                        isInvalid={!!errors.correo}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="d-flex justify-content-center align-items-center"
                    controlId="formHorizontalTelefono"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Teléfono
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="telefono"
                        value={values.telefono}
                        onChange={handleChange}
                        isValid={touched.telefono && !errors.telefono}
                        isInvalid={!!errors.telefono}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col
                  xs={12}
                  md={1}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className={styles.verticalLine}></div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                    <img
                      className={styles.IconLocation2}
                      src={Location2}
                      alt="Location"
                    />
                    <p className={styles.datos}>Mi Dirección</p>
                  </div>

                  <Form.Group
                    as={Row}
                    controlId="formHorizontalRegion"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Región
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        name="region"
                        value={values.region}
                        onChange={(e) => handleRegionChange(e, handleChange)}
                        isValid={touched.region && !errors.region}
                        isInvalid={!!errors.region}
                        style={{
                          borderRadius: "32px",
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {regiones.map((region) => (
                          <option key={region.idRegion} value={region.idRegion}>
                            {region.nombreRegion}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formHorizontalComuna"
                    className="d-flex justify-content-center align-items-center mt-3"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Comuna
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        name="comuna"
                        value={values.comuna}
                        onChange={(e) => {
                          const selectedComuna = comunas.find(
                            (comuna) =>
                              comuna.idComuna === parseInt(e.target.value)
                          );
                          setFieldValue(
                            "comuna",
                            selectedComuna ? selectedComuna.idComuna : ""
                          );
                          handleChange(e);
                        }}
                        isValid={touched.comuna && !errors.comuna}
                        isInvalid={!!errors.comuna}
                        style={{
                          borderRadius: "32px",
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {comunas.map((comuna) => (
                          <option key={comuna.idComuna} value={comuna.idComuna}>
                            {comuna.nombreComuna}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formHorizontalDireccion"
                    className="d-flex justify-content-center align-items-center mt-2"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Dirección
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange}
                        isValid={touched.direccion && !errors.direccion}
                        isInvalid={!!errors.direccion}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="d-flex justify-content-center align-items-center"
                    controlId="formHorizontalnumero"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Número
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="numero"
                        value={values.numero}
                        onChange={handleChange}
                        isValid={touched.numero && !errors.numero}
                        isInvalid={!!errors.numero}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="d-flex justify-content-center align-items-center"
                    controlId="formHorizontalReferencias"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Referencias
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="referencias"
                        value={values.referencias}
                        onChange={handleChange}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="d-flex justify-content-center align-items-center"
                    controlId="formHorizontalAlias"
                  >
                    <Form.Label
                      column
                      sm={3}
                      style={{
                        color: "#000000",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                      }}
                    >
                      Alias
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        name="alias"
                        value={values.alias}
                        onChange={handleChange}
                        style={{
                          borderRadius: "32px",
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="d-flex justify-content-center py-4">
                <Col
                  xs={10}
                  md={10}
                  style={{ borderBottom: "1px solid #BFBFBF" }}
                ></Col>
              </Row>

              <Row>
                <Col
                  md={12}
                  className="d-flex justify-content-center pt-3 pb-5"
                >
                  <Button
                    type="submit"
                    variant="warning"
                    style={{
                      width: "178px",
                      height: "56px",
                      borderRadius: "32px",
                      color: "#363636",
                      fontSize: "16px",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                    }}
                  >
                    Continuar
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </MainLayout>
  );
};
