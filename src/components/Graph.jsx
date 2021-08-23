import React, { useContext } from "react";
import { Graph } from "react-d3-graph";
import styled from "styled-components";
import { AppContext } from "../context/Context";

const GraphStyles = styled.div`
  height: calc(100vh - 100px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    background: transparent;
  }
  p {
    text-align: center;
    margin: 1rem 1rem 4rem;
  }
`;

function GraphComponent() {
  const ctx = useContext(AppContext);

  if (!ctx.data)
    return (
      <div
        style={{
          height: "calc(100vh - 100px)",
          paddingTop: "5rem",
        }}
      >
        <p>Please visit posts page to fetch data to view</p>
      </div>
    );

  // Processes user nodes
  const users = ctx.data?.data.map((post) => {
    return {
      id: `${post.owner.firstName} ${post.owner.lastName}`,
      name: `${post.owner.firstName} ${post.owner.lastName}`,
      size: 250,
      svg: post.owner.picture,
    };
  });

  // Processes tag nodes
  const tagsArr = [];
  ctx.data?.data.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsArr.push(tag);
    });
  });

  const uniqueTags = [...new Set(tagsArr)];

  const tags = uniqueTags.map((t) => {
    return {
      id: t,
      symbolType: "circle",
      color: "#eb4034",
      size: 200,
    };
  });

  // Processes tag links
  const linksTags = uniqueTags.map((ut) => {
    return {
      source: "Tags",
      target: ut,
    };
  });

  // Processes user links
  const linksUsersArr = [];
  ctx.data?.data.forEach((post) => {
    post.tags.forEach((tag) => {
      const fullName = `${post.owner.firstName} ${post.owner.lastName}`;

      linksUsersArr.push({
        source: tag,
        target: fullName,
      });
    });
  });

  const linksUsers = linksUsersArr.reduce((unique, o) => {
    if (
      !unique.some((obj) => obj.source === o.source && obj.target === o.target)
    ) {
      unique.push(o);
    }
    return unique;
  }, []);

  // Graph config
  const config = {
    directed: true,
    nodeHighlightBehavior: true,
    d3: {
      alphaTarget: 1.05,
      gravity: -100,
      linkLength: 150,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "orange",
      size: 60,
      highlightStrokeColor: "magenta",
      fontSize: 16,
      highlightFontSize: 16,
    },
    link: {
      highlightColor: "magenta",
    },
  };

  const graphData = {
    links: [...linksTags, ...linksUsers],
    nodes: [
      {
        id: "Tags",
        size: 500,
        fontSize: 14,
      },
      ...tags,
      ...users,
    ],
  };

  return (
    <GraphStyles>
      <>
        <p>
          This shows the relationship between the poster and the tags they've
          used, for the current page (Page {ctx.page + 1}).
        </p>
        <Graph id="graph-id" data={graphData} config={config} />
      </>
    </GraphStyles>
  );
}

export default GraphComponent;
