import { View, StatusBar, StyleSheet, FlatList,RefreshControl, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../main/src/mainConstants";
import AppSearch from "../../../components/AppSearch";
import EventItem from "./EventItem";
import { useGetEvents } from "../hooks/useGetEventQuery";
import {
  MainLoadingScreen,
  MainSafeAreaScreen,
  MainErrorsScreen,
} from "../../main/view";
import { navigateTo } from "../../navigation/RootNavigation";
import AppIcon from "../../../components/AppIcon";
import AppModal from "../../../components/AppModal";

const EventListingItemScreen = () => {
  const { data, isLoading, isSuccess, isRefetching, refetch, error } =
    useGetEvents();
  const [events, setEvents] = useState<[]>([]);

  useEffect(() => {
   //setEvents(data._embedded.events);
  }, []);

  

  const renderEvents = (item: any) => (
    <EventItem
      onPress={() => navigateTo("EventListingItemDetails", { item })}
      title={item.name}
      image={item.images[0].url}
      body={item?.promoter?.description}
      type={item.type}
      country={item._embedded.venues[0].country.name}
    />
  );

  const renderSearchContainer = () => (
    <View style={styles.searchContainer}>
      <AppSearch style={styles.appSearch} />
      <AppModal />
    </View>
  );
  return (
    <>
      {isLoading ? (
        <MainLoadingScreen />
      ) : isSuccess && data !== "error" ? (
        <MainSafeAreaScreen>
          
          {renderSearchContainer()}
          <FlatList
            data={events}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            renderItem={({ item }) => renderEvents(item)}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => {
                  refetch();
                }}
              />
            }
          />
        </MainSafeAreaScreen>
      ) : (
        <MainErrorsScreen />
      )}
    </>
  );


};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterContainer: {
    width:50,
    height:50,
    borderRadius: SIZES.S_8,
    backgroundColor: COLORS.lightGrey,
    marginVertical: SIZES.S_5,
    marginEnd: SIZES.S_2,
    justifyContent: 'center',
  },
  appSearch: {
    marginVertical: SIZES.S_5,
    marginHorizontal: SIZES.S_5,
    borderRadius: SIZES.S_8,
    backgroundColor: COLORS.lightGrey,
    flex: 1,
  
  },
});

export default EventListingItemScreen;
