import { useEffect, useState } from "react";
import { ActionPanel, Detail, List, Action } from "@raycast/api";

const pickLists = ["Places to work", "Lunch joints"]



export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(pickLists);

  useEffect(() => {
    filterList(pickLists.filter((list) => list.includes(searchText)));
  }, [searchText]);

  return (
    <List
      onSearchTextChange={setSearchText}
      navigationTitle="Pick From Which List?"
      searchBarPlaceholder="Search your lists "
    >
      {filteredList.map((list) => (
        <List.Item
          key={list}
          icon="list-icon.png"
          title={list}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
