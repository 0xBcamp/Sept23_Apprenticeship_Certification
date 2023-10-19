// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { users, connections } from "@/components/SocialGraph/users";

// function SocialGraph() {
//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Sample data representing a social network with 10 users
//     const nodes = [
//       { id: "Alice", image: "/logo2.png" },
//       { id: "Bob", image: "/logo2.png" },
//       { id: "Charlie", image: "/logo2.png" },
//       // Add more user nodes here with their image URLs
//     ];

//     const links = [
//       { source: "Alice", target: "Bob" },
//       { source: "Bob", target: "Charlie" },
//       // Define connections between users
//     ];

//     // Create a D3 force simulation to lay out the social graph
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force(
//         "link",
//         d3.forceLink(links).id((d) => d.id)
//       )
//       .force("charge", d3.forceManyBody().strength(-100)) // Increase strength for more spacing
//       .force("center", d3.forceCenter(300, 300));

//     // Define the links as lines
//     const link = svg
//       .selectAll(".link")
//       .data(links)
//       .enter()
//       .append("line")
//       .attr("class", "link");

//     // Define the nodes as images
//     const node = svg
//       .selectAll(".node")
//       .data(nodes)
//       .enter()
//       .append("g") // Use a 'g' element to group the image and the tooltip
//       .attr("class", "node")
//       .call(
//         d3
//           .drag()
//           .on("start", (event, d) => {
//             if (!event.active) simulation.alphaTarget(0.3).restart();
//             d.fx = d.x;
//             d.fy = d.y;
//           })
//           .on("drag", (event, d) => {
//             d.fx = event.x;
//             d.fy = event.y;
//           })
//           .on("end", (event, d) => {
//             if (!event.active) simulation.alphaTarget(0);
//             d.fx = null;
//             d.fy = null;
//           })
//       );

//     node
//       .append("image")
//       .attr("xlink:href", (d) => d.image)
//       .attr("width", 40) // Set the width of the image
//       .attr("height", 40) // Set the height of the image
//       .attr("x", -20) // Adjust for larger width
//       .attr("y", -20); // Adjust for larger height

//     node
//       .append("title") // Add a title element for the tooltip
//       .text((d) => d.id); // Text for the tooltip

//     // Update node and link positions in the simulation
//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d) => d.source.x)
//         .attr("y1", (d) => d.source.y)
//         .attr("x2", (d) => d.target.x)
//         .attr("y2", (d) => d.target.y);

//       node.attr("transform", (d) => `translate(${d.x},${d.y})`);
//     });
//   }, []);

//   return (
//     <svg
//       ref={svgRef}
//       width="600"
//       height="600"
//       style={{ border: "1px solid #ccc" }}
//     />
//   );
// }

// export default SocialGraph;

/**
 *
 */

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { users, connections } from "@/components/SocialGraph/users";

function SocialGraph() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Sample data representing a social network with 10 users

    // Create a D3 force simulation to lay out the social graph
    const simulation = d3
      .forceSimulation(users)
      .force(
        "link",
        d3.forceLink(connections).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-200)) // Increase strength for more spacing
      .force("center", d3.forceCenter(300, 300));

    // Define the links as lines
    const connection = svg
      .selectAll(".connection")
      .data(connections)
      .enter()
      .append("line")
      .attr("class", "link");

    // Define the users as squares
    const user = svg
      .selectAll(".user")
      .data(users)
      .enter()
      .append("g") // Use a 'g' element to group the square and the tooltip
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    user
      .append("image")
      //       .append("image")
      .attr("xlink:href", (d) => d.image)

      .attr("width", 40)
      .attr("height", 40)
      .attr("x", -20) // Adjust for larger width
      .attr("y", -20); // Adjust for larger height

    user
      .append("title") // Add a title element for the tooltip
      .text((d) => d.id); // Text for the tooltip

    // Update node and link positions in the simulation
    simulation.on("tick", () => {
      connection
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      user.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="600"
      height="600"
      style={{ border: "1px solid #ccc" }}
    />
  );
}

export default SocialGraph;
