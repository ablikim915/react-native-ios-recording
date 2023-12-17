import { StyleSheet } from 'react-native';


export default StyleSheet.create({
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
  timeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8
  },
  controler: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  }
});