import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Skeleton from 'react-loading-skeleton';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
 fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#003366',
  },
  subHeader: {
    fontSize: 22,
    marginVertical: 12,
    color: '#00509e',
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 10,
    lineHeight: 1.8,
  },
  table: {
    width: '100%',
    marginVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width:"500px"
  },
  tableCol: {
    width: '50%',
    padding: 10,
    textAlign: 'justify',
  },
  tableCell: {
    fontSize: 11,
    color: '#333',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingLeft: 30,
    marginVertical: 10,
  },
  listItem: {
    marginBottom: 10,
    fontSize: 14,
    paddingVertical:3,
    color: '#333',
    lineHeight: 1.8,
  },
  swotTable: {
    width: '100%',
    marginVertical: 12,
  },
  swotTableRow: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  swotTableCol: {
    width: '50%',
    padding: 10,
    textAlign: 'center',
  },
  tableCellHeader: {
    fontWeight: 'bold',
  },
  logframeTable: {
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginVertical: 15,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  logframeHeader: {
    flexDirection: 'row',
    backgroundColor: '#3b5998', // Custom header background color
    paddingVertical: 12,
  },
  logframeRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  logframeRowEven: {
    backgroundColor: '#e8f0fe', 
  },
  logframeRowOdd: {
    backgroundColor: '#ffffff', 
  },
  logframeCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#dddddd',
    fontSize: 15,
  },
  logframeCellHeader: {
    fontWeight: 'bold',
    color: '#ffffff', 
    textAlign: 'center',
    fontSize: 16,
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
  "Results chain": string;
  Indicator: string;
  Baseline: string;
  Target: string;
  Timeline: string;
  Assumptions: string;
}

interface MyDocumentProps {
  projectData: ProjectData | null;
  promptData: PromptData | null;
  pestleData: PestleData | null;
  logframeData: LogframeData[] | null;
  isLoading: boolean;
}

const MyDocument: React.FC<MyDocumentProps> = ({ projectData, promptData, pestleData, logframeData, isLoading }) => {
 const renderList = (data: any) => {
  return (
    <View style={styles.listContainer}>
      {data
        .split(/(?<=\d\.\s)/) // Split based on the numbering pattern, keeping the delimiter
        .filter((item: string) => item.trim() !== "")
        .map((item: string, index: number) => (
          <Text key={index} style={styles.listItem}>
           {item.trim()}
          </Text>
        ))}
    </View>
  );
};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>
            Strategic Plan {projectData ? projectData.name : <Skeleton width={150} />}
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
                <Text style={styles.swotTableCol}>Strengths (S)</Text>
                <Text style={styles.swotTableCol}>Weaknesses (W)</Text>
              </View>
              {promptData && promptData.swot && promptData.swot.response && (
                JSON.parse(promptData.swot.response).strengths.map((strength: any, index: any) => (
                  <View style={styles.swotTableRow} key={index}>
                    <Text style={styles.swotTableCol}>{strength}</Text>
                    <Text style={styles.swotTableCol}>{JSON.parse(promptData.swot.response).weaknesses[index]}</Text>
                  </View>
                ))
              )}
            </View>
              <View style={[styles.swotTableRow, styles.tableHeader]}>
                <Text style={styles.swotTableCol}>Opportunities (O)</Text>
                <Text style={styles.swotTableCol}>Threats (T)</Text>
              </View>
                  {promptData && promptData.swot && promptData.swot.response && (
                JSON.parse(promptData.swot.response).opportunities.map((opportunity: any, index: any) => (
                  <View style={styles.swotTableRow} key={index}>
                    <Text style={styles.swotTableCol}>{opportunity}</Text>
                    <Text style={styles.swotTableCol}>{JSON.parse(promptData.swot.response).threats[index]}</Text>
                  </View>
                ))
              )}
          </View>
          <View>
            <Text style={styles.subHeader}>PESTLE Analysis</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCol}>Category</Text>
                <Text style={styles.tableCol}>Influence on Organization</Text>
                <Text style={styles.tableCol}>Impact on Organization</Text>
              </View>
              {pestleData && (
                <>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Political</Text>
                    <Text style={styles.tableCol}>{pestleData.political.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.political.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Economic</Text>
                    <Text style={styles.tableCol}>{pestleData.economic.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.economic.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Social</Text>
                    <Text style={styles.tableCol}>{pestleData.social.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.social.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Technological</Text>
                    <Text style={styles.tableCol}>{pestleData.technological.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.technological.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Legal</Text>
                    <Text style={styles.tableCol}>{pestleData.legal.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.legal.imp}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Environmental</Text>
                    <Text style={styles.tableCol}>{pestleData.environmental.inf}</Text>
                    <Text style={styles.tableCol}>{pestleData.environmental.imp}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
      <View style={styles.logframeTable}>
  <View style={styles.logframeHeader}>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Results Chain</Text>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Indicator</Text>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Baseline</Text>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Target</Text>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Timeline</Text>
    <Text style={[styles.logframeCell, styles.logframeCellHeader]}>Assumptions</Text>
  </View>
  {logframeData &&
    logframeData.map((item: any, index: number) => (
      <View
        style={[
          styles.logframeRow,
          index % 2 === 0 ? styles.logframeRowEven : styles.logframeRowOdd,
        ]}
        key={index}
      >
        <Text style={styles.logframeCell}>{item["Results chain"]}</Text>
        <Text style={styles.logframeCell}>{item.Indicator}</Text>
        <Text style={styles.logframeCell}>{item.Baseline}</Text>
        <Text style={styles.logframeCell}>{item.Target}</Text>
        <Text style={styles.logframeCell}>{item.Timeline}</Text>
        <Text style={styles.logframeCell}>{item.Assumptions}</Text>
      </View>
    ))}
</View>


        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
