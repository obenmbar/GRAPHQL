/**
 * Generates an SVG-based Pie Chart for audit success/failure ratios.
 * Uses the circumference property to draw a circular progress bar (donut style).
 */
export function CreateAuditPieChart(passCount, failCount) {
  
    const total = passCount + failCount;
    if (total === 0) return "<p style='text-align:center;'>No Audits Yet</p>";

    const passPercent = Math.round((passCount / total) * 100);
  

   
    const radius = 80; 
     
    const circumference = 2 * Math.PI * radius; 
    

    const passStrokeLength = (passPercent / 100) * circumference;

    return `
        <svg viewBox="0 0 250 250" width="100%" height="100%" style="transform: rotate(-90deg);">
            <circle 
                cx="125" cy="125" r="${radius}" 
                fill="none" 
                stroke="#ff4757" 
                stroke-width="30" 
            />
            
            <circle 
                cx="125" cy="125" r="${radius}" 
                fill="none" 
                stroke="#2ed573" 
                stroke-width="30.5" 
                stroke-dasharray="${passStrokeLength} ${circumference}" 
                stroke-linecap="round"
            />
            
            <text x="125" y="115" text-anchor="middle" font-size="28" font-weight="bold" fill="#333" transform="rotate(90 125 125)">
                ${passPercent}%
            </text>
            <text x="125" y="145" text-anchor="middle" font-size="14" font-weight="600" fill="#7f8c8d" transform="rotate(90 125 125)">
                Pass Rate
            </text>
        </svg>
    `;
}
/**
 * Transforms raw GraphQL transactions into a structured format for charting.
 * Calculates cumulative XP totals and parses timestamps and project names.
 */
export function ProcessXpData(transactions) {
    let cumulativeXp = 0;
    let cleanData = [];

    transactions.forEach(tx => {

        cumulativeXp += tx.amount;


        const dateObj = new Date(tx.createdAt);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { 
            day: '2-digit', month: 'short', year: 'numeric' 
        });

     
        const pathParts = tx.path.split('/');
        const projectName = pathParts[pathParts.length - 1];

       
        cleanData.push({
            xp: cumulativeXp,         
            date: formattedDate,     
            name: projectName        
        });
    });

    return cleanData;
}
/**
 * Renders a responsive SVG line chart representing the user's XP progression over time.
 * Includes data scaling and interactive tooltips for each completed project.
 */
export function CreateXpLineChart(data) {
    if (!data || data.length === 0) return "<p>No XP Data</p>";

    const svgWidth = 600;
    const svgHeight = 300;
    
    const padding = 50; 
    
    const graphWidth = svgWidth - (padding * 2); 
    const graphHeight = svgHeight - (padding * 2);

  
    const maxXP = data[data.length - 1].xp;

 
    let polylinePoints = ""; 
    let svgElements = "";    

    data.forEach((item, index) => {
      
        const xPercentage = data.length > 1 ? index / (data.length - 1) : 0.5;
      
        const x = (xPercentage * graphWidth) + padding     

       
        const yPercentage = item.xp / maxXP; 
       
        const y = svgHeight - padding - (yPercentage * graphHeight);

     
        polylinePoints += `${x},${y} `;

        
        const formattedXpForTooltip = Math.round(item.xp / 1000) + "KB"; 
        
        svgElements += `
            <g class="xp-data-point">
              
                <circle cx="${x}" cy="${y}" r="2" fill="#00f2fe" stroke="#1e1e1e" stroke-width="2" />
                
              
                <text x="${x}" y="${y - 15}" text-anchor="middle" class="xp-tooltip" fill="#3a3939" font-size="13">
                    ${item.name} (${formattedXpForTooltip})
                </text>
                
             
                <text x="${x}" y="${svgHeight - 15}" text-anchor="middle" class="xp-tooltip date-tooltip" fill="#3a3939" font-size="12">
                    ${item.date}
                </text>
            </g>
        `;
    });

  
    return `
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%">

            <line x1="${padding}" y1="${svgHeight - padding}" x2="${svgWidth - padding}" y2="${svgHeight - padding}" class="grid-line" />
          
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${svgHeight - padding}" class="grid-line" />

            <polyline points="${polylinePoints}" fill="none" stroke="#00f2fe" stroke-width="2" stroke-linejoin="round" />

         
            ${svgElements}
        </svg>
    `;
}