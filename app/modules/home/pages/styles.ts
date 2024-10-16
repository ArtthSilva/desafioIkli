import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    home: {
      flex: 1,
      backgroundColor: '#000',
      gap: 10,
    },
    home__header: {
      position: 'absolute',
      top: 50,
      height: 40,
      width: '100%',
      borderBottomWidth: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    home__headerText: {
      textAlign: 'left',
      color: 'white',
      fontSize: 24,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    home__stories: {
      marginTop: 115,
    },
    home__publications: {
      paddingTop: 20,
      marginTop: 20,
    },
  });
  