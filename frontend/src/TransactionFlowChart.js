/* import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TransactionFlowChart = ({ transactions, title }) => {
  const ref = useRef(null);

  useEffect(() => {
    const width = 1200; // Increased width
    const height = 800; // Increased height

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous render

    // Prepare nodes and links
    const nodes = Array.from(new Set(transactions.flatMap(tx => [tx.from, tx.to])), id => ({ id }));
    const links = transactions.map(tx => ({
      source: tx.from,
      target: tx.to
    }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-300)) // Adjusted charge strength
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(50)); // Adjusted collision radius

    // Add arrow markers
    svg.append('defs').selectAll('marker')
      .data(['end'])
      .enter().append('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20) // Adjusted marker position
      .attr('refY', 0)
      .attr('markerWidth', 10) // Adjusted marker size
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

    // Add links
    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 3) // Adjusted stroke width
      .attr('marker-end', 'url(#arrow-end)');

    // Add nodes
    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 10) // Increased node size
      .attr('fill', '#1f77b4');

    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('x', 12)
      .attr('y', 4)
      .text(d => d.id.substring(0, 10) + '...');

    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeElements
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      svg.selectAll('text')
        .attr('x', d => d.x + 12)
        .attr('y', d => d.y + 4);
    });
  }, [transactions]);

  return (
    <div>
      <h3>{title}</h3>
      <svg ref={ref}></svg>
    </div>
  );
};

export default TransactionFlowChart;
 */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';

const TransactionFlowChart = ({ transactions, title }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const width = 1200;
    const height = 750;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'white') // Dark background
      .style('color', '#0ff'); // Neon blue text

    svg.selectAll('*').remove();

    // Limit the transactions to 75
    const limitedTransactions = transactions.slice(0, 75);

    const nodes = Array.from(new Set(limitedTransactions.flatMap(tx => [tx.from, tx.to])), id => ({ id }));
    const links = limitedTransactions.map(tx => ({ source: tx.from, target: tx.to }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(50));

    svg.append('defs').selectAll('marker')
      .data(['end'])
      .enter().append('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#0ff'); // Neon blue arrow

    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 3)
      .attr('marker-end', 'url(#arrow-end)');

    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', '#1f77b4')
      .on('click', (event, d) => {
        navigate(`/history/${d.id}`);
      })
      .on('mouseover', (event, d) => {
        d3.select('#tooltip')
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px')
          .style('opacity', 1)
          .text(d.id);
      })
      .on('mouseout', () => {
        d3.select('#tooltip')
          .style('opacity', 0);
      });

    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeElements
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Add tooltip element
    if (!d3.select('#tooltip').node()) {
      d3.select('body').append('div')
        .attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('padding', '10px')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', '#0ff')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('opacity', 0);
    }
  }, [transactions, navigate]);

  return (
    <div>
      <h3 style={{ color: 'white' }}>{title}</h3> {/* Neon blue text */}
      <svg ref={ref}></svg>
    </div>
  );
};

export default TransactionFlowChart;










