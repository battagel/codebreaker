declare module "myTypes" {
  type ProjectType = {
    name: string;
    description: string;
    language: string;
    html_url: string;
  };

  interface ProjectInt {
    projectList: ProjectType[];
  }

  interface MenuOpenedProps {
    menuOpened: boolean;
    setMenuOpened: Dispatch<SetStateAction<boolean>>;
  }
}

module.exports = {
  ProjectType,
  ProjectProps,
};
