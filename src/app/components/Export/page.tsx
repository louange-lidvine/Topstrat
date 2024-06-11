const MyDocument = () => (
  <Document pageMode="fullScreen">
    <Page size="A4" style={{ margin: "auto", padding: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div
          style={{
            color: "#6b7280",
            border: "2px solid #d1d5db",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          <Text>{projectData && projectData.name}</Text>
        </div>
        <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: 24 }}>
          <Text>Preview</Text>
        </div>
        <div style={{ color: "#1e40af", fontWeight: "bold", fontSize: 24 }}>
          <Text>Strategic Plan {projectData && projectData.name}</Text>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: "#1e40af", fontWeight: "bold", fontSize: 20 }}>
          <Text>Project Overview</Text>
        </h3>
        {isLoading ? (
          <Skeleton width="100%" height={30} />
        ) : (
          <p>
            <Text>{projectData && projectData.description}</Text>
          </p>
        )}
      </div>
      <Section title="Vision" content={promptData?.vision?.response} />
      <Section title="Mission" content={promptData?.mission?.response} />
      <Section
        title="Objectives"
        content={promptData?.objectives?.response}
        isList
      />
      <Section
        title="Values"
        content={promptData?.values?.response}
        isList
      />
      <Section
        title="Strategy"
        content={promptData?.strategy?.response}
        isList
      />
      <SWOTAnalysis data={promptData?.swot?.response} />
      <PESTLEAnalysis data={pestleData} />
      <LogFrame data={logframeData} />
    </Page>
  </Document>
);

const Section = ({ title, content, isList }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ color: "#0B6C79", fontWeight: "bold", fontSize: 20 }}>
      <Text>{title}</Text>
    </h3>
    {isLoading ? (
      <Skeleton width="100%" height={30} />
    ) : isList ? (
      <ul>{renderList(content)}</ul>
    ) : (
      <p>
        <Text>{content}</Text>
      </p>
    )}
  </div>
);

const SWOTAnalysis = ({ data }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{ color: "#0B6C79", fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
      <Text>SWOT ANALYSIS</Text>
    </h2>
    <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
      <thead>
        <tr style={{ color: "#0B6C79", backgroundColor: "#f3f4f6" }}>
          <th style={tableHeaderStyle}>Strengths (S)</th>
          <th style={tableHeaderStyle}>Weaknesses (W)</th>
        </tr>
      </thead>
      <tbody>
        {renderSWOTRows(data?.strengths, data?.weaknesses)}
      </tbody>
      <thead>
        <tr style={{ color: "#0B6C79", backgroundColor: "#f3f4f6" }}>
          <th style={tableHeaderStyle}>Opportunities (O)</th>
          <th style={tableHeaderStyle}>Threats (T)</th>
        </tr>
      </thead>
      <tbody>
        {renderSWOTRows(data?.opportunities, data?.threats)}
      </tbody>
    </table>
  </div>
);

const PESTLEAnalysis = ({ data }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ color: "#0B6C79", fontWeight: "bold", fontSize: 20 }}>
      <Text>PESTLE Analysis</Text>
    </h3>
    <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
      <thead>
        <tr style={{ backgroundColor: "#e5e7eb" }}>
          <th style={tableHeaderStyle}></th>
          <th style={tableHeaderStyle}>Influence on organization</th>
          <th style={tableHeaderStyle}>Impact on organization</th>
        </tr>
      </thead>
      <tbody>
        {renderPESTLERows(data)}
      </tbody>
    </table>
  </div>
);

const LogFrame = ({ data }) => (
  <div style={{ marginBottom: 20 }}>
    <h3 style={{ color: "#0B6C79", fontWeight: "bold", fontSize: 20 }}>
      <Text>Logframe</Text>
    </h3>
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 10 }}>
        <thead>
          <tr style={{ backgroundColor: "#e5e7eb" }}>
            <th style={tableHeaderStyle}>Results Chain</th>
            <th style={tableHeaderStyle}>Project Summary</th>
            <th style={tableHeaderStyle}>Indicators</th>
            <th style={tableHeaderStyle}>Means of Verification</th>
            <th style={tableHeaderStyle}>Assumptions/Risks</th>
          </tr>
        </thead>
        <tbody>
          {data && renderLogFrameRows(data)}
        </tbody>
      </table>
    </div>
  </div>
);

const tableHeaderStyle = {
  border: "2px solid black",
  padding: "6px",
  textAlign: "center",
  fontWeight: "bold",
};

const renderSWOTRows = (column1, column2) => {
  const maxLength = Math.max(column1?.length || 0, column2?.length || 0);
  const rows = [];
  for (let i = 0; i < maxLength; i++) {
    rows.push(
      <tr key={i}>
        <td style={tableCellStyle}>{column1?.[i]}</td>
        <td style={tableCellStyle}>{column2?.[i]}</td>
      </tr>
    );
  }
  return rows;
};

const renderPESTLERows = (data) => {
  const categories = ["political", "economic", "social", "technological", "legal", "environmental"];
  return categories.map((category) => (
    <tr key={category}>
      <td style={tableCellStyle}>{capitalize(category)}</td>
      <td style={tableCellStyle}>{data?.[category]?.inf}</td>
      <td style={tableCellStyle}>{data?.[category]?.imp}</td>
    </tr>
  ));
};

const renderLogFrameRows = (data) => {
  const rows = [];
  ["goal", "outcome"].forEach((key) => {
    if (data[key]) {
      rows.push(
        <tr key={key}>
          <td style={tableCellStyle}>{capitalize(key)}</td>
          <td style={tableCellStyle}>{data[key].description}</td>
          <td style={tableCellStyle}>{data[key].indicators.join(", ")}</td>
          <td style={tableCellStyle}>{data[key].mov.join(", ")}</td>
          <td style={tableCellStyle}>{data[key].assump.join(", ")}</td>
        </tr>
      );
    }
  });
  ["outputs", "activities"].forEach((key) => {
    data[key]?.forEach((item, index) => {
      rows.push(
        <tr key={`${key}-${index}`}>
          <td style={tableCellStyle}>{capitalize(key)} {index + 1}</td>
          <td style={tableCellStyle}>{item.description}</td>
          <td style={tableCellStyle}>{item.indicators.join(", ")}</td>
          <td style={tableCellStyle}>{item.mov.join(", ")}</td>
          <td style={tableCellStyle}>{item.assump.join(", ")}</td>
        </tr>
      );
    });
  });
  return rows;
};

const tableCellStyle = {
  border: "2px solid black",
  padding: "6px",
  textAlign: "left",
};

const capitalize = (s) => s.charAt(0).toUpperCase + s.slice(1);

export default MyDocument;
