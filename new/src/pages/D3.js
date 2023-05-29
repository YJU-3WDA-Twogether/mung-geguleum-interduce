import React, { useEffect, useRef ,useState} from 'react';
import * as d3 from 'd3';
import '../styles/d3.css';
import axios from 'axios';
import Modal from 'react-modal';

const API_URL = process.env.REACT_APP_API_URL;

const D3 = () => {
    const svgRef = React.useRef();
    const [graphData, setGraphData] = useState(null);
    const simulationRef = useRef(null);

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

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = +svg.node().getBoundingClientRect().width;
        const height = +svg.node().getBoundingClientRect().height;

        let link, node, simulation;


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

            // generate the svg objects and force simulation

            simulation = d3.forceSimulation(graphData.nodes);
            // set up the simulation and event to update locations after each tick
            simulation.on("tick", ticked);
            initializeForces();
            updateDisplay();

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

            var helloNode = graphData.nodes.find(function (node) {
                return node.id === "잔잔한 피아노 사운드";
            });

            if (helloNode) {
                helloNode.fx = width / 2;
                helloNode.fy = height / 2;
                simulation.alphaTarget(0).restart();
            }
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
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.0001);
            d.fx = null;
            d.fy = null;
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
    // 댓글
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    const handleCommentSubmit = (e) => {
        e.preventDefault(); // 폼의 기본 동작인 새로고침을 방지합니다.

        if (newComment.trim() === "") {
            return; // 댓글 내용이 비어있으면 함수를 종료합니다.
        }

        const newCommentObj = {
            id: comments.length + 1, // 댓글에 고유한 id를 할당합니다.
            text: newComment,
            replies: [] // 답글 배열을 초기화합니다.
        };

        const updatedComments = [...comments, newCommentObj]; // 새로운 댓글을 기존의 댓글 배열에 추가합니다.
        setComments(updatedComments); // 업데이트된 댓글 배열을 설정합니다.
        setNewComment(""); // 입력 필드를 비웁니다.
    };
    const handleReply = (commentIndex) => {
        const commentText = comments[commentIndex].text; // 선택한 댓글의 텍스트를 가져옵니다.
        const replyText = prompt(`"${commentText}"에 대한 답글 내용을 입력하세요`); // 답글 내용을 입력받습니다.

        const updatedComments = [...comments]; // 기존의 댓글 배열을 복사합니다.

        // 선택한 댓글의 텍스트에 언급(@)을 추가한 답글을 생성합니다.
        const replyWithMention = `@${commentText} ${replyText}`;

        // 선택한 댓글에 답글을 추가합니다.
        updatedComments[commentIndex].replies.push({ text: replyWithMention });

        setComments(updatedComments); // 업데이트된 댓글 배열을 설정합니다.
    };

    return (
        <>
            <svg ref={svgRef} width={1000} height={800}></svg>
            {selectedNode && (
                <Modal isOpen={true} onRequestClose={closeModal} className="modal-container">
                    <div className="left-content">
                        <h2>{selectedNode.title}</h2>
                        <p>{selectedNode.id}</p>
                        <p>{selectedNode.nickname}</p>
                        {nodeData && (
                            <>
                                {nodeData.file.map((item, index) => (
                                    <div key={index}>
                                        {item.fsname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                                            <div className="img-wrap">
                                                <img src={`${API_URL}/file/read/${item.fno}`} alt="file" style={{ width: 600, height: 650 }} />
                                            </div>
                                        ) : item.fsname.match(/.(mp4|webm)$/i) ? (
                                            <div className="video-wrap">
                                                <video controls style={{ width: 550, height: 550 }}>
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
                    </div>
                    <div className="right-content">
                        <div>
                            <h3>댓글</h3>
                            {/* Render comments */}
                            {comments.map((comment, index) => (
                                <div key={comment.id}>
                                    <p>{comment.text}</p>
                                    {/* Render replies */}
                                    {comment.replies.map((reply, replyIndex) => (
                                        <div key={replyIndex} className="reply">
                                            <span>{reply.text}</span>
                                        </div>
                                    ))}
                                    {/* Reply button */}
                                    <button onClick={() => handleReply(index)}>답글 달기</button>
                                </div>
                            ))}
                            {/* Comment form */}
                            <form onSubmit={handleCommentSubmit}>
                                <input
                                    type="text"
                                    placeholder="댓글을 입력하세요"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button type="submit">댓글 작성</button>
                            </form>
                        </div>
                    </div>

                </Modal>
            )}
        </>
    );

};
export default D3