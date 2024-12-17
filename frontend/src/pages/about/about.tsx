import { Typography, Row, Col, List, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <Row justify="center" style={{ marginBottom: "48px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={1}>About Our Multivendor Marketplace</Title>
          <Paragraph style={{ fontSize: "18px" }}>
            Connecting buyers and sellers in a seamless online shopping
            experience.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginBottom: "48px" }}>
        <Col xs={24} md={12}>
          <Title level={2}>Our Mission</Title>
          <Paragraph>
            We aim to create a thriving ecosystem where businesses of all sizes
            can showcase their products to a global audience, while providing
            shoppers with an unparalleled selection of unique items.
          </Paragraph>
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>Why Choose Us</Title>
          <List
            dataSource={[
              "Wide variety of products from multiple vendors",
              "Secure and easy-to-use platform",
              "Competitive pricing and great deals",
              "Excellent customer support",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>

      <Row justify="center">
        <Col
          xs={24}
          md={16}
          style={{
            textAlign: "center",
            background: "#f0f2f5",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <Title level={2}>Become a Vendor</Title>
          <Paragraph style={{ marginBottom: "24px" }}>
            Join our growing community of successful online sellers. Start your
            journey today!
          </Paragraph>
          <Link to="/register">
            <Button danger size="large">
              Get Started
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
