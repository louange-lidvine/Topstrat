import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import Skeleton from "react-loading-skeleton";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  subHeader: {
    fontSize: 18,
    margin: 10,
    color: "#0B6C79",
  },
  text: {
    margin: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    // display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#0B6C79",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#0B6C79",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  tableHeader: {
    backgroundColor: "#E4E4E4",
    fontWeight: "bold",
  },
});

interface ProjectData {
  name: string;
  description: string;
}

interface PromptData {
  vision: { response: string };
  mission: { response: string };
  objectives: { response: string };
  values: { response: string };
  strategy: { response: string };
  swot: { response: string };
}

interface PestleData {
  political: { inf: string; imp: string };
  economic: { inf: string; imp: string };
  social: { inf: string; imp: string };
  technological: { inf: string; imp: string };
  legal: { inf: string; imp: string };
  environmental: { inf: string; imp: string };
}

interface LogframeData {
  goal: {
    description: string;
    indicators: string[];
    mov: string[];
    assump: string[];
  };
  outcome: {
    description: string;
    indicators: string[];
    mov: string[];
    assump: string[];
  };
  outputs: {
    description: string;
    indicators: string[];
    mov: string[];
    assump: string[];
  }[];
  activities: {
    description: string;
    indicators: string[];
    mov: string[];
    assump: string[];
  }[];
}

interface MyDocumentProps {
  projectData: ProjectData | null;
  promptData: PromptData | null;
  pestleData: PestleData | null;
  logframeData: LogframeData | null;
  isLoading: boolean;
}

const MyDocument: React.FC<MyDocumentProps> = ({
  projectData,
  promptData,
  pestleData,
  logframeData,
  isLoading,
}) => {

  const renderList = (data: string) => {
    return data
      .split(/\d+\.\s*/)
      .filter((item) => item.trim() !== "")
      .map((item, index) => (
        <View>
          <Text key={index}>
            {index + 1}. {item.trim()}
          </Text>
        </View>
      ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>
            {projectData ? projectData.name : <Skeleton width={100} />}
          </Text>
          <Text style={styles.subHeader}>Preview</Text>
          <Text style={styles.subHeader}>
            Strategic Plan{" "}
            {projectData ? projectData.name : <Skeleton width={100} />}
          </Text>
          <View>
            <Text style={styles.subHeader}>Project Overview</Text>
            <Text style={styles.text}>
              {projectData ? projectData.description : <Skeleton count={3} />}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Vision</Text>
            <Text style={styles.text}>
              {promptData ? promptData.vision.response : <Skeleton count={2} />}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Mission</Text>
            <Text style={styles.text}>
              {promptData ? (
                promptData.mission.response
              ) : (
                <Skeleton count={2} />
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Objectives</Text>
            <Text style={styles.text}>
              {promptData ? (
                renderList(promptData.objectives.response)
              ) : (
                <Skeleton count={2} />
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Values</Text>
            <Text style={styles.text}>
              {promptData ? (
                renderList(promptData.values.response)
              ) : (
                <Skeleton count={2} />
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Strategy</Text>
            <Text style={styles.text}>
              {promptData ? (
                renderList(promptData.strategy.response)
              ) : (
                <Skeleton count={2} />
              )}
            </Text>
          </View>
          <View>
            <Text style={styles.subHeader}>SWOT Analysis</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Strengths (S)
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Weaknesses (W)
                </Text>
              </View>
              {promptData &&
                promptData.swot &&
                promptData.swot.response &&
                JSON.parse(promptData.swot.response).strengths.map(
                  (strength: any, index: any) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={styles.tableCol}>{strength}</Text>
                      <Text style={styles.tableCol}>
                        {JSON.parse(promptData.swot.response).weaknesses[index]}
                      </Text>
                    </View>
                  )
                )}
            </View>
          </View>
          <View>
            <Text style={styles.subHeader}>PESTLE Analysis</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCol, styles.tableCell]}></Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Influence on Organization
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Impact on Organization
                </Text>
              </View>
              {pestleData && (
                <>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Political
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.political.inf}
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.political.imp}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Economic
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.economic.inf}
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.economic.imp}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Social
                    </Text>
                    <Text style={styles.tableCol}>{pestleData.social.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.social.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Technological
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.technological.inf}
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.technological.imp}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Legal
                    </Text>
                    <Text style={styles.tableCol}>{pestleData.legal.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.legal.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Environmental
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.environmental.inf}
                    </Text>
                    <Text style={styles.tableCol}>
                      {pestleData.environmental.imp}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.subHeader}>Logframe</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Results Chain
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Project Summary
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Indicators
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Means of Verification
                </Text>
                <Text style={[styles.tableCol, styles.tableCell]}>
                  Assumptions
                </Text>
              </View>
              {logframeData && (
                <>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Goal
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.goal.description}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.goal.indicators.join(", ")}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.goal.mov.join(", ")}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.goal.assump.join(", ")}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableHeader]}>
                      Outcome
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.outcome.description}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.outcome.indicators.join(", ")}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.outcome.mov.join(", ")}
                    </Text>
                    <Text style={styles.tableCol}>
                      {logframeData.outcome.assump.join(", ")}
                    </Text>
                  </View>
                  {logframeData.outputs.map((output, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={[styles.tableCol, styles.tableHeader]}>
                        Output {index + 1}
                      </Text>
                      <Text style={styles.tableCol}>{output.description}</Text>
                      <Text style={styles.tableCol}>
                        {output.indicators.join(", ")}
                      </Text>
                      <Text style={styles.tableCol}>
                        {output.mov.join(", ")}
                      </Text>
                      <Text style={styles.tableCol}>
                        {output.assump.join(", ")}
                      </Text>
                    </View>
                  ))}
                  {logframeData.activities.map((activity, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={[styles.tableCol, styles.tableHeader]}>
                        Activity {index + 1}
                      </Text>
                      <Text style={styles.tableCol}>
                        {activity.description}
                      </Text>
                      <Text style={styles.tableCol}>
                        {activity.indicators.join(", ")}
                      </Text>
                      <Text style={styles.tableCol}>
                        {activity.mov.join(", ")}
                      </Text>
                      <Text style={styles.tableCol}>
                        {activity.assump.join(", ")}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
