import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/D3.css';
import { json } from "d3-fetch";
const D3 = () => {
    const svgRef = useRef(null);
    const width = 800;
    const height = 600;

    // svg objects
    let link, node;
    // the data - an object with nodes and links
    let graph;

    // force simulator
    let simulation = d3.forceSimulation();

    function ticked() {
        // update node and link positions at every step of
        // the force simulation
        node.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });

        link.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
    }

    function initializeDisplay() {
        // set up the svg objects
        const svg = d3.select(svgRef.current);

        link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line");

        node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", "red");
    }

    function initializeSimulation() {
        simulation.nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link", d3.forceLink(graph.links).id(function (d) {
            return d.id;
        }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        updateAll();
    }

    function updateForces() {
        // apply new force properties
        simulation.force("link")
            .links(graph.links)
            .distance(30)
            .strength(1);

        simulation.force("charge")
            .strength(-100);

        simulation.force("center")
            .x(width / 2)
            .y(height / 2);

        simulation.alpha(1).restart();
    }

    function updateDisplay() {
        // update the nodes and links
        node = node.data(graph.nodes, function (d) {
            return d.id;
        });
        node.exit().remove();
        node = node.enter().append("circle")
            .attr("r", 5)
            .attr("fill", "red")
            .merge(node);

        link = link.data(graph.links, function (d) {
            return d.source.id + "-" + d.target.id;
        });
        link.exit().remove();
        link = link.enter().append("line")
            .merge(link);
    }

    function updateAll() {
        updateForces();
        updateDisplay();
    }
    useEffect(() => {
        const svg = d3.select(svgRef.current);

        json("/data/miserables.json")
            .then((_graph) => {
                graph = _graph;
                initializeDisplay();
                initializeSimulation();
            })
            .catch((error) => {
                throw error;
            });
    }, []);

    return (
        <div className="force-graph">
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
};
export default D3;