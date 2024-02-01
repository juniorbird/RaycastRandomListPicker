import { useEffect, useState } from "react";
import { ActionPanel, Detail, List, Action } from "@raycast/api";

const placesToWork = [10,11,12]
const lunchJoints = ["McDonalds", "Burger King", "KFC"]
const pickLists = [{title: "Places to work", contents: placesToWork}, { title: "Lunch joints", contents: lunchJoints}]

interface ListElement {
  title: string;
  contents: object;
}

function ListParent(props: { listElements: ListElement[],
  navigationTitle: string,
  searchBarPlaceholder: string,
  onSearchTextChange: (searchText: string) => void}
  ) {
  return (
    <List
      onSearchTextChange={props.onSearchTextChange}
      navigationTitle={props.navigationTitle}
      searchBarPlaceholder={props.searchBarPlaceholder}
    >
      {props.listElements.map((list) => (
        <List.Item
          key={list.title}
          icon="list-icon.png"
          title={list.title}
          actions={
            <ActionPanel>
              <Action.Push title="Show List" target={<Detail markdown={String(list.contents)}/>} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}



export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(pickLists);

  useEffect(() => {
    filterList(pickLists.filter((list) => list["title"].includes(searchText)));
  }, [searchText]);

  return (
    <ListParent
      listElements={pickLists}
      onSearchTextChange={setSearchText}
      navigationTitle="Pick From Which List?"
      searchBarPlaceholder="Search your lists "
    />
  );
}
