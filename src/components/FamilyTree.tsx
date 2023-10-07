import React from "react";

interface Person {
  id: number;
  name: string;
  children?: Person[];
  parent?: Person | undefined;
  editMode?: boolean | undefined;
}

interface FamilyTreeProps {
  setFamilyData: React.Dispatch<React.SetStateAction<Person>>;
  familyData: Person;
  boxRef: any;
  scale: string;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  scale,
  boxRef,
  familyData,
  setFamilyData,
}) => {
  console.log(familyData);

  const handleAddChild = (person: Person) => {
    const childName = prompt("Enter new branche:");
    if (childName) {
      const newChild: Person = {
        id: Math.random(),
        name: childName,
        parent: person,
      };

      person.children = person.children
        ? [...person.children, newChild]
        : [newChild];
      setFamilyData({ ...familyData });
    }
  };

  const handleRemoveChild = (child: Person, parent: Person) => {
    if (parent) {
      parent.children = parent.children?.filter((c) => c.id !== child.id);
      setFamilyData((prevData) => {
        const updatedData = { ...prevData };
        updateChildrenRecursively(updatedData, child.id, null);
        return updatedData;
      });
    }
  };

  const updateChildrenRecursively = (
    node: Person,
    childIdToRemove: number,
    parent: Person | null
  ) => {
    if (node.id === childIdToRemove) {
      parent?.children?.splice(
        parent.children.findIndex((c) => c.id === childIdToRemove),
        1
      );
    } else if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        updateChildrenRecursively(node.children[i], childIdToRemove, node);
      }
    }
  };

  const handleChangeName = (
    person: Person,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    person.name = event.target.value;
    setFamilyData({ ...familyData });
  };

  const handleToggleEditMode = (person: Person) => {
    person.editMode = !person.editMode;
    setFamilyData({ ...familyData });
  };

  const renderFamilyTree = (person: Person): JSX.Element => {
    return (
      <div key={person.id}>
        <div className="father-block">
          {person.editMode ? (
            <input
              type="text"
              value={person.name}
              onChange={(event) => handleChangeName(person, event)}
            />
          ) : (
            <span>{person.name}</span>
          )}
          <button className="add-button" onClick={() => handleAddChild(person)}>
            &#43;
          </button>

          <button
            className="edit-button"
            onClick={() => handleToggleEditMode(person)}
          >
            {person.editMode ? "✔" : "✎"}
          </button>
          {person.parent && (
            <button
              className="delete-button"
              onClick={() => handleRemoveChild(person, person.parent!)}
            >
              &#215;
            </button>
          )}
        </div>
        <div className="block">
          {person.children &&
            person.children.map((child) => (
              <React.Fragment key={child.id}>
                {renderFamilyTree(child)}
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={boxRef}
      style={{ transform: ` scale(${scale})` }}
      className="family-tree"
    >
      {renderFamilyTree(familyData)}
    </div>
  );
};

export default FamilyTree;
