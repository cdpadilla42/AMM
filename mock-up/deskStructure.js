import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      // Make a new list item
      S.listItem()
        // Give it a title
        .title('Folders')
        .child(
          S.list()
            .title('Folders')
            .items([
              // Add a new parent list item
              S.listItem()
                .title('Dialogue by Conversation')
                .child(
                  // List out the categories
                  S.documentTypeList('conversation')
                    .title('Dialogue by Conversation')
                    // When a category is selected, pass its id down to the next pane
                    .child((conversationID) =>
                      // load a new document list
                      S.documentList()
                        .title('Projects')
                        // Use a GROQ filter to get documents.
                        // This filter checks for sampleProjects that has the
                        // categoryId in its array of references
                        .filter(
                          '_type == "dialogue" && $conversationID == conversation._ref'
                        )
                        .params({ conversationID })
                    )
                ),
            ])
        ),
      ...S.documentTypeListItems(),
    ]);
