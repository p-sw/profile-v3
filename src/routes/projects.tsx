import { FC, ReactElement } from 'react';
import { Flex, Box, useDisclosure } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import {
  ProjectCardContainer,
  ProjectCard,
  ProjectCardProps,
} from '@c/ProjectCard';

type ProjectCategoryProps = {
  categoryName: string;
  children: ReactElement<ProjectCardProps> | ReactElement<ProjectCardProps>[];
};

const ProjectCategory: FC<ProjectCategoryProps> = ({
  categoryName,
  children,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      direction="column"
      w="full"
      h="fit-content"
      py="15px"
      gap="5px"
      userSelect="none"
    >
      <Flex
        direction="row"
        w="full"
        h="fit-content"
        p="5px"
        borderBottom="1px solid secondary"
        onClick={onToggle}
        textStyle="poppins"
        fontWeight="semibold"
        fontSize="24px"
        cursor="pointer"
      >
        <ChevronUpIcon
          w="35px"
          h="35px"
          transform={isOpen ? undefined : 'rotateX(180deg)'}
          transition="all 200ms ease-out"
        />
        {categoryName}
      </Flex>
      <ProjectCardContainer
        opacity={isOpen ? 1 : 0}
        h={isOpen ? '150px' : '0'}
        transition="all 200ms ease-in-out"
        overflowY="clip"
      >
        {children}
      </ProjectCardContainer>
    </Flex>
  );
};

const Projects: FC = () => {
  return (
    <Flex p="20px 30px" direction="column">
      <Box
        as="h1"
        textStyle="poppins"
        fontSize={{ base: '36px', md: '48px' }}
        fontWeight={'bold'}
      >
        Projects
      </Box>
      <ProjectCategory categoryName="Python">
        <ProjectCard
          title={'Nyanlang'}
          subtitle="Esoteric Programming Language"
          github="https://github.com/nyanlang/nyanlang"
          web="https://nyanlang.org"
        >
          Esoteric programming language made by me. Highly inspired by Brainfuck
          programming language.
        </ProjectCard>
        <ProjectCard
          title={'DodgeGame'}
          subtitle="Simple DodgeGame & Backend"
          github="https://github.com/ritonis/dodgegame"
        >
          DodgeGame made for Bupyeong High School festival. Leaderboard API
          backend is included in this project repository. API Backend is used by
          DodgeGame Leaderboard project.
        </ProjectCard>
        <ProjectCard
          title={'Simple Calculator'}
          subtitle="Simple Calculator using Pygame"
          github="https://github.com/ritonis/simple-calculator"
        >
          Simple Calculator GUI written in Python programming language and
          Pygame library.
        </ProjectCard>
        <ProjectCard
          title={'StDict Word DB'}
          subtitle="Word Database Project"
          github="https://github.com/ritonis/stdict_word_db"
        >
          Word database project using Standard Korean Dictionary OpenAPI.
        </ProjectCard>
      </ProjectCategory>
      <ProjectCategory categoryName="JS/TS">
        <ProjectCard
          title={'Nyanlang VSCode'}
          subtitle="VSCode Extension for Nyanlang"
          github="https://github.com/nyanlang/nyanlang-vscode-ext"
          web="https://nyanlang.org"
        >
          Nyanlang extension for Visual Studio Code. Supports file icon, syntax
          highlighting. Language server is not ready yet, but it is also on my
          plan.
        </ProjectCard>
      </ProjectCategory>
      <ProjectCategory categoryName="Web">
        <ProjectCard
          title={'Nyanlang Web'}
          subtitle="Web Documentation & Playground for Nyanlang"
          github="https://github.com/nyanlang/nyanlang-web"
          web="https://nyanlang.org"
        >
          Project Nyanlang&quot;s website project. Only frontend is included in
          this repository. Playground backend code is in private repository.
        </ProjectCard>
        <ProjectCard
          title={'DodgeGame Leaderboard'}
          subtitle="Leaderboard Frontend for DodgeGame"
          github="https://github.com/ritonis/dodge-game-leaderboard"
        >
          Leaderboard web page for DodgeGame project. Made for Bupyeong High
          School festival. Reading game data from API backend server, display it
          in frontend.
        </ProjectCard>
        <ProjectCard
          title="SchoolTime"
          subtitle="Web App for Korean School Timetable & Cafeteria Menu"
          github="https://github.com/ritonis/schooltime"
        >
          Web app for korean school timetable & cafeteria menu. Written in
          Django, currently dead project.
        </ProjectCard>
        <ProjectCard
          title="Profile v2"
          subtitle="Profile & Portfolio Version 2"
          github="https://github.com/ritonis/portfolio-v2"
          web="https://v2.ritonis.me"
        >
          Profile & Portfolio web page version 2. Written in NextJS, Chakra-UI,
          with new App Directory feature.
        </ProjectCard>
        <ProjectCard
          title="Profile v3"
          subtitle="Current version of Profile & Portfolio"
          github="https://github.com/ritonis/profile-v3"
          web="https://ritonis.me"
        >
          Profile & Portfolio web page version 2. Written in React, Chakra-UI,
          React Router.
        </ProjectCard>
      </ProjectCategory>
    </Flex>
  );
};

export default Projects;
