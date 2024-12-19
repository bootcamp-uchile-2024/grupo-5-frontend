import { Col, Row } from "react-bootstrap";
import { MainLayout } from "../layout/MainLayout";
import { Link } from "react-router-dom";
import styles from "./css/DireccionPage.module.css";

export const DireccionPage = () => {
  return (
    <MainLayout>
      <Row className="mb-5 pt-5">
        <Link to="/" className={styles.linkVolver}>
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon"
            style={{
              width: "24px",
              height: "24px",
              filter: "invert(1)",
              marginRight: "8px",
              marginLeft: "30px",
            }}
          />
          Volver
        </Link>
      </Row>
    </MainLayout>
  );
};
