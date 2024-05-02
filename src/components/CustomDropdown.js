import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const CustomDropdown = ({options, onSelect}) => {
  const DropDownButton = React.useRef();
  const [query, searchQuery] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [dropdownTop, setDropdownTop] = React.useState(0);

  const toggleDropdown = () => {
    isVisible ? setIsVisible(false) : openDropDown();
  };

  const filterOption = options.filter(option =>
    option.toLowerCase().includes(query.toLowerCase()),
  );

  const openDropDown = () => {
    DropDownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      const dropDownHeight = 160;
      const calculated = py + h;
      setDropdownTop(
        calculated + dropDownHeight > windowHeight
          ? py - dropDownHeight
          : calculated,
      );
    });
    setIsVisible(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect(item);
        setIsVisible(false);
      }}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={query}
              onChangeText={text => searchQuery(text)}
            />
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filterOption}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={DropDownButton}
        activeOpacity={0.5}
        onPress={toggleDropdown}
        style={styles.selectContainer}>
        {renderDropdown()}
        <Text>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDropdown;

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  selectContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
    borderRadius: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 0,
  },
  dropdown: {
    // position: 'absolute',
    backgroundColor: '#efefef',
    marginHorizontal: 15,
    height: 160,
    borderRadius: 10,
    // width: '100%',
    // shadowColor: '#000000',
    // shadowRadius: 4,
    // shadowOffset: {height: 4, width: 0},
    // shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    // backgroundColor: '#efefef',
    // margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomWidth: 1,
  },
});
