import React from "react";

const SimpleTemplate = ({ formData, resumeRef }) => {
  return (
    <div
      id="resume-content"
      className="resume-layout"
      ref={resumeRef}
      style={{
        display: "block",
        padding: "15px",
        fontFamily: "Georgia, serif",
        boxSizing: "border-box",
        fontSize: "16px",
        lineHeight: "1.35",
        color: "#000",
        backgroundColor: "#fff",
        minHeight: "296mm",
      }}
    >
      <div
        style={{
          border: "2px solid #000",
          padding: "20px",
          minHeight: "calc(296mm - 30px)",
          boxSizing: "border-box",
        }}
      >
      {/* TITLE */}
      <center>
        <strong style={{ textDecoration: "underline", fontSize: "20px" }}>
          CURRICULUM VITAE
        </strong>
      </center>

      {/* NAME */}
      <h2 style={{ margin: "8px 0 4px", fontSize: "24px" }}>
        {formData.fullName || "YOUR NAME"}
      </h2>

      {/* CONTACT */}
      <p style={{ margin: "2px 0" }}>
        <strong>Permanent Address:</strong> {formData.address}
      </p>
      <p style={{ margin: "2px 0" }}>
        <strong>Mobile No:</strong> {formData.phone} <br />
        <strong>Email:</strong> {formData.email}
      </p>

      <Section title="Career Objective">
        <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{formData.summary}</p>
      </Section>

      {formData.education?.length > 0 && (
        <Section title="Educational Qualification">
          <ul>
            {formData.education.map((edu, i) => (
              <li key={i}>
                <strong>{edu.degree}</strong> – {edu.school} ({edu.duration})
              </li>
            ))}
          </ul>
        </Section>
      )}

      {formData.skills && (
        <Section title="Computer Knowledge">
          <ul>
            {formData.skills.split(",").map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Work Experience">
        <p style={{ margin: 0 }}>
          {formData.experience?.length ? "Experience Available" : "Fresher"}
        </p>
      </Section>

      <Section title="Personal Details">
        <table style={{ width: "100%" }}>
          <tbody>
            <Row label="Father’s Name" value={formData.fatherName} />
            <Row label="Date of Birth" value={formData.dob} />
            <Row label="Gender" value={formData.gender} />
            <Row label="Nationality" value={formData.nationality} />
            <Row label="Languages Known" value={formData.languages} />
            <Row label="Marital Status" value={formData.maritalStatus} />
          </tbody>
        </table>
      </Section>

      {formData.customSections?.map((section, index) => (
        section.content && (
          <Section key={index} title={section.title}>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{section.content}</p>
          </Section>
        )
      ))}

      <p style={{ marginTop: "8px" }}>
        I hereby declare that the information given above is true to the best of
        my knowledge.
      </p>

      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>DATE: __________</span>
        <strong>({formData.fullName})</strong>
      </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginTop: "12px" }}>
    <div
      style={{
        backgroundColor: "#d3d3d3",
        fontWeight: "bold",
        textAlign: "left",

        /* PDF PERFECT ALIGNMENT */
        paddingBottom: "10px",
        paddingLeft: "10px",

        fontSize: "16px",
      }}
    >
      {title}:
    </div>
    {children}
  </div>
);


const Row = ({ label, value }) => (
  <tr>
    <td style={{ width: "35%", fontWeight: "bold" }}>{label}</td>
    <td>: {value}</td>
  </tr>
);

export default SimpleTemplate;
