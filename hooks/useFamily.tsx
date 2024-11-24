import { supabase } from "@/db";

const useFamily = async (session: any, person_id: any) => {
  let { data, error } = await supabase.rpc("get_relation", {
    user_id: session,
    my_id: person_id,
  });
  if (error) console.error(error);
  else {
    let groupedRelations: any = [
      {
        section: "is_child_of",
        data: [],
        title: "Parent",
        id: "7df3aef1-039b-40ce-a48e-676f70a772b8",
      },
      {
        section: "is_spouse_of",
        data: [],
        title: "Spouse",
        id: "79b322f7-f3a0-4c13-8c4f-4c44148876d4",
      },
      {
        section: "is_parent_of",
        data: [],
        title: "Child",
        id: "17c804a6-c993-42ba-b9ca-564d5c676042",
      },
      {
        section: "is_sibling_of",
        data: [],
        title: "Sibling",
        id: "dff3ce70-657a-48a9-8378-db6ec417b50c",
      },
    ];

    // Iterate over each relation in the relations array
    data?.forEach((relation: any) => {
      const group = groupedRelations.find(
        (gr: any) => gr.section === relation.relation_type
      );
      if (group) {
        // Add the person data (without relation_type) to the appropriate group
        group.data.push(relation);
      }
    });

    // If no data found for a relation type, it will remain as an empty array
    groupedRelations = groupedRelations.filter(
      (group: any) => group.data.length > 0 || group.title
    );

    return groupedRelations;
  }
};

export default useFamily;
