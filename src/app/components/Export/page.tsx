import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Skeleton from 'react-loading-skeleton';

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
    textAlign: 'center',
    margin: 10,
  },
  subHeader: {
    fontSize: 18,
    margin: 10,
    color: '#0B6C79',
  },
  text: {
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    // display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#0B6C79',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#0B6C79',
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
    backgroundColor: '#E4E4E4',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderCell: {
    textAlign: 'center',
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  swotTable: {
    // display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#0B6C79',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  swotTableRow: {
    flexDirection: "row",
  },
  swotTableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#0B6C79',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
});

interface ProjectData {
  name: string;
  description: string;
}

interface PromptData {
  vision: { response: string };
  mission: { response: string };
  objectives: { response: string[] };
  values: { response: string[] };
  strategy: { response: string[] };
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
  map(arg0: (item: any, index: any) => React.JSX.Element): unknown;
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

const MyDocument: React.FC<MyDocumentProps> = ({ projectData, promptData, pestleData, logframeData, isLoading }) => {
  const renderList = (data:any) => {
    return data
        .split(/\d+\.\s*/)
        .filter((item:any) => item.trim() !== "")
        .map((item:any, index:any) => (
            <Text key={index}>
                {index + 1}. {item.trim()}
            </Text>
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
              Strategic Plan {projectData ? projectData.name : <Skeleton width={100} />}
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
                {promptData ? promptData.mission.response : <Skeleton count={2} />}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeader}>Objectives</Text>
              <Text style={styles.text}>
                {promptData ? renderList(promptData.objectives.response) : <Skeleton count={2} />}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeader}>Values</Text>
              <Text style={styles.text}>
                {promptData ? renderList(promptData.values.response) : <Skeleton count={2} />}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeader}>Strategy</Text>
              <Text style={styles.text}>
                {promptData ? renderList(promptData.strategy.response) : <Skeleton count={2} />}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeader}>SWOT Analysis</Text>
              <View style={styles.swotTable}>
                <View style={[styles.swotTableRow, styles.tableHeader]}>
                  <Text style={[styles.swotTableCol, styles.tableHeaderCell]}>
                    Strengths (S)
                  </Text>
                  <Text style={[styles.swotTableCol, styles.tableHeaderCell]}>
                    Weaknesses (W)
                  </Text>
                </View>
                {promptData && promptData.swot && promptData.swot.response && (
                  JSON.parse(promptData.swot.response).strengths.map((strength:any, index:any) => (
                    <View style={styles.swotTableRow} key={index}>
                      <Text style={styles.swotTableCol}>{strength}</Text>
                      <Text style={styles.swotTableCol}>{JSON.parse(promptData.swot.response).weaknesses[index]}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>
            <View>
              <Text style={styles.subHeader}>PESTLE Analysis</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCol, styles.tableHeaderCell]}>Category</Text>
                  <Text style={[styles.tableCol, styles.tableHeaderCell]}>Influence on Organization</Text>
                  <Text style={[styles.tableCol, styles.tableHeaderCell]}>Impact on Organization</Text>
                </View>
                {pestleData && (
                  <>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Political</Text>
                      <Text style={styles.tableCol}>{pestleData.political.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.political.imp}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Economic</Text>
                      <Text style={styles.tableCol}>{pestleData.economic.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.economic.imp}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Social</Text>
                      <Text style={styles.tableCol}>{pestleData.social.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.social.imp}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Technological</Text>
                      <Text style={styles.tableCol}>{pestleData.technological.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.technological.imp}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Legal</Text>
                      <Text style={styles.tableCol}>{pestleData.legal.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.legal.imp}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Environmental</Text>
                      <Text style={styles.tableCol}>{pestleData.environmental.inf}</Text>
                      <Text style={styles.tableCol}>{pestleData.environmental.imp}</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          <View>
  <Text style={styles.subHeader}>Logframe</Text>
  <View style={styles.table}>
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Results Chain</Text>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Indicator</Text>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Baseline</Text>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Target</Text>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Timeline</Text>
      <Text style={[styles.tableCol, styles.tableHeaderCell]}>Assumptions</Text>
    </View>
    {logframeData && (
      <>
        {logframeData.map((item:any, index:any) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCol, styles.tableHeaderCell]}>{item.category}</Text>
            <Text style={[styles.tableCol, styles.tableHeaderCell]}>{item.indicator}</Text>
            <Text style={styles.tableCol}>{item.baseline}</Text>
            <Text style={styles.tableCol}>{item.target}</Text>
            <Text style={styles.tableCol}>{item.timeline}</Text>
            <Text style={styles.tableCol}>{item.assumptions}</Text>
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
