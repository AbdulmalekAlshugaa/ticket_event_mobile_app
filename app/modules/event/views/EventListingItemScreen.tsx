import { View, StatusBar, StyleSheet, FlatList,RefreshControl } from "react-native";
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

const EventListingItemScreen = () => {
  const { data, isLoading, isSuccess, isRefetching, refetch, error } =
    useGetEvents();
  const [events, setEvents] = useState<[]>([]);

  useEffect(() => {
    setEvents(data._embedded.events);
  }, []);


  const renderEvents = (item: any) => (
    <EventItem
      onPress={() => console.log("pressed")}
      title={item.name}
      image={item.images[0].url}
      body={item.body}
    />
  );

  const renderSearchContainer = () => (
    <View style={styles.searchContainer}>
      <AppSearch style={styles.appSearch} />
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
  searchContainer: {},
  appSearch: {
    marginVertical: SIZES.S_5,
  },
});

export default EventListingItemScreen;
