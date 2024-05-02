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
  Image,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const chevron_down = require('../images/chevron-down.png');
const chevron_up = require('../images/chevron-up.png');

const CustomDropdown = ({
  options,
  selectedValue,
  onSelect,
  inputBackgroundColor,
  fontSize,
  fontFamily,
  fontColor,
  textInputFontColor,
  itemFontColor,
}) => {
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
      <Text
        style={{
          color: !itemFontColor ? '#222222' : itemFontColor,
          fontSize: !fontSize ? 12 : fontSize,
          fontFamily: fontFamily,
          textTransform: 'capitalize',
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={{
            color: !fontColor ? '#000000' : fontColor,
            fontFamily: fontFamily,
            fontSize: !fontSize ? 14 : fontSize,
          }}>
          No data found
        </Text>
      </View>
    );
  };

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
              style={[
                styles.searchInput,
                {
                  fontSize: !fontSize ? 12 : fontSize,
                  fontFamily: fontFamily,
                  color: !fontColor ? '#000000' : fontColor,
                },
              ]}
              placeholder="Search"
              value={query}
              onChangeText={text => searchQuery(text)}
              placeholderTextColor={
                !textInputFontColor ? '#000000' : textInputFontColor
              }
            />
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filterOption}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={emptyComponent}
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
        style={[
          styles.selectContainer,
          {
            backgroundColor: !inputBackgroundColor
              ? '#efefef'
              : inputBackgroundColor,
          },
        ]}>
        {renderDropdown()}
        <Text
          style={{
            color: !fontColor ? '#000000' : fontColor,
            fontFamily: fontFamily,
            fontSize: !fontSize ? 14 : fontSize,
            textTransform: 'capitalize',
          }}>
          {!selectedValue.length ? 'Select' : selectedValue}
        </Text>
        <Image
          source={isVisible ? chevron_up : chevron_down}
          style={{width: 18, height: 18}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDropdown;

export const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 15,
  },
  selectContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#2e2e2e',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
    marginHorizontal: 8,
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
  emptyContainer: {
    paddingTop: 25,
    alignItems: 'center',
  },
});
