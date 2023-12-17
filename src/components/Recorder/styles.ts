import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    flex: 1
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  recorder: {
    marginBottom: 30
  },
  recordTime: {
    fontSize: 24,
    color: '#333',
    marginVertical: 16,
    height: 30,
    textAlign: 'center'
  },
  recordButton: {
    borderRadius: 64,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recordList: {
    flex: 1
  },
  recordListTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 15
  },
  recortItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 10
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordName: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerEditor: { 
    flexDirection: 'row', 
    marginLeft: 'auto',
    columnGap: 10
  },
  editBtn: {
    marginHorizontal: -18
  },
  playProgress: {
    width: '100%',
    height: 4,
    backgroundColor: '#ccc',
    marginVertical: 10
  },
  controler: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  emptyList: {
    alignItems: 'center'
  },
  emptyListText: {
    fontSize: 18,
    marginTop: 50
  }
});