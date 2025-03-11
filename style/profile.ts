import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%", 
    width:"100%",
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%", 
    zIndex: 0, 
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    position:"absolute",
    alignItems: 'center',
    paddingVertical: 20,
    zIndex:1000,
    top:15,
    left:0,
    right:0,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ADD8E6', // Light Blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width:"100%",
    flex: 1,
    marginTop:"25%",
    paddingTop:"20%",
    paddingBottom:"25%",
    paddingHorizontal: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: 'white',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  optionDeleteContent: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  optionDeleteIcon: {
    color:"red",
    marginRight: 10,
  },
  optionDeleteText: {
    color:"red",
    fontSize: 16,
  },
});

