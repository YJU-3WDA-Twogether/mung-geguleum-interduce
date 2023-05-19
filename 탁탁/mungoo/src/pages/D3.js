import React, { useEffect, useRef ,useState} from 'react';
import * as d3 from 'd3';
import '../styles/D3.css';
import axios from 'axios';
// import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/remake-read.css'


const API_URL = process.env.REACT_APP_API_URL;

const D3 = () => {
    const svgRef = React.useRef();
    const [graphData, setGraphData] = useState(null);
    const simulationRef = useRef(null);
    
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = +svg.node().getBoundingClientRect().width;
        const height = +svg.node().getBoundingClientRect().height;

        let link, node, simulation;

        const fetchGraphData = async () => {
            try {
                const response = await axios.get(`${API_URL}/tag/json`);
                const data = response.data[0];
                console.log(data);
                setGraphData(data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };
        const initializeDisplay = () => {
            // set the data and properties of link lines
            link = svg
                .append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graphData.links)
                .enter()
                .append("line")
                .attr("marker-end", "url(#arrowhead)");

            // set the data and properties of node circles
            node = svg
                .append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graphData.nodes)
                .enter()
                .append("circle")
                .call(
                    d3
                        .drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended)
                )
                .on('click', openModal);
            // node tooltip
            node
                .append("title")
                .text((d) => `${d.id}\n${d.title}\n${d.nickname}`);

                      // Update the 'node' and 'link' variables with the selection of nodes and links
                  node = svg.selectAll(".nodes circle");
                  link = svg.selectAll(".links line");

                  // Update the 'node' variable with the selection of nodes
                  node = node.merge(node);

            // generate the svg objects and force simulation

            simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink().id((d) => d.id))
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .stop();

            // set up the simulation and event to update locations after each tick
            simulation.on("tick", ticked);

            initializeForces();
            updateDisplay();
            simulation.restart(); // Restart the simulation
        };

        const initializeForces = () => {
            // add forces and associate each with a name
            simulation
                .force(
                    "link",
                    d3.forceLink().id((d) => {
                        return d.id;
                    })
                )
                .force("charge", d3.forceManyBody())
                .force("collide", d3.forceCollide())
                .force("center", d3.forceCenter(width / 2, height / 2));
            updateForces();

            // var helloNode = graphData.nodes.find(function (node) {
            //     return node.id === "잔잔한 피아노 사운드";
            // });

            // if (helloNode) {
            //     helloNode.fx = width / 2;
            //     helloNode.fy = height / 2;
            //     simulation.alphaTarget(0).restart();
            // }
        };

        const updateForces = () => {
            // get each force by name and update the properties
            simulation.force("charge").strength(-120);

            simulation
                .force("link")
                .distance(30)
                .iterations(1)
                .links(graphData.links);
        };

        const updateDisplay = () => {
            node
                .attr("r", 5)
                .attr("stroke", "red")
                .attr("stroke-width", Math.abs(-120) / 15);

            link.attr("stroke-width", 1).attr("opacity", 1);
        };

        const ticked = () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        };

        // 화살표 만들기
        svg
            .append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 25)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");

        const dragstarted = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
          d.fx = Math.max(0, Math.min(d3.event.x, 900));
          d.fy = Math.max(0, Math.min(d3.event.y, 500));
        };

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.0001);
            d.fx = null;
            d.fy = null;
            // if (d.id === "잔잔한 피아노 사운드") {
            //   d.x = width / 2;
            //   d.y = height / 2;
            // } else {
            //   d.fx = null;
            //   d.fy = null;
            // }

        };

        if (graphData && graphData.links && graphData.nodes) {
            initializeDisplay();
        } else {
            fetchGraphData();
        }

        const handleWindowResize = () => {
            const width = +svg.node().getBoundingClientRect().width;
            const height = +svg.node().getBoundingClientRect().height;
            if (simulationRef.current) {
                simulationRef.current.force("center", d3.forceCenter(width / 2, height / 2));
                updateForces();
                updateDisplay();
            }
        };


        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
          // 시뮬레이션 정리
    if (simulation) {
      simulation.stop();
      simulation = null;
    }
        };
    }, [graphData]);


const [selectedNode, setSelectedNode] = useState(null);
    const [nodeData, setNodeData] = useState(null);
    const openModal = async (d) => {
        setSelectedNode(d);
        try {
            const response = await axios.get(`${API_URL}/post/read/${d.id}`);
            const data = response.data;
            setNodeData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching node data:', error);
        }
    };

    const closeModal = () => {
        setSelectedNode(null);
        setNodeData(null);
    };
    return (
        <>
            <svg ref={svgRef} width={900} height={500}></svg>
            {selectedNode && (
                  <Modal show={true} onHide={closeModal} className='remake-read'>
                      <Modal.Header closeButton>
                        <Modal.Title>{selectedNode.title}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                  <div className='remake-read-Text'>
                  <h2>{selectedNode.title}</h2>
                  <p>{selectedNode.id}</p>
                  <p>{selectedNode.nickname}</p>
                  </div>
                  {nodeData && (
                    <>
                      {nodeData.file.map((item, index) => (
                        <div key={index} className='remake-many'>
                          {item.fsname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                            <div className="img-wrap">
                              <img src={`${API_URL}/file/read/${item.fno}`} alt="file" style={{ width: 100, height: 200 }} />
                            </div>
                          ) : item.fsname.match(/.(mp4|webm)$/i) ? (
                            <div className="video-wrap">
                              <video controls style={{ width: 200, height: 300 }}>
                                <source src={`${API_URL}/file/read/${item.fno}`} type={`video/${item.fsname.split('.').pop()}`} />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ) : item.fsname.match(/.(mp3|wav)$/i) ? (
                            <div className="audio-wrap">
                              <audio controls>
                                <source src={`${API_URL}/file/read/${item.fno}`} type={`audio/${item.fsname.split('.').pop()}`} />
                                Your browser does not support the audio tag.
                              </audio>
                            </div>
                          ) : (
                            <div className="file-wrap">
                              <a href={`${API_URL}/file/read/${item.fno}`} target="_blank" rel="noopener noreferrer">
                                {item.fsname}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
        </>
    );
};
export default D3;