import { Logout } from './logout.js'
import { FetchProfileData } from '../api/auth.js'
import { CreateAuditPieChart, ProcessXpData, CreateXpLineChart } from './svg.js';
import { RenderPopupError } from '../utils/helpers.js';
/**
 * Orchestrates the dashboard rendering by fetching user data and populating the UI 
 * with profile information, real-time statistics, and custom SVG charts.
 */
export async function RenderHome() {
    const container = document.getElementById('container')

    container.innerHTML = `
        <div class="loading-container">
            <h2 class="loading-text">Loading Profile... ⏳</h2>
        </div>
    `;

    setTimeout(async () => {
        try {
            const data = await FetchProfileData()
            const user = data.user[0]
            const totalXpRaw =  data.total_xp.aggregate.sum.amount

            let formattedXp = Math.round(totalXpRaw / 1000) + "KB"
            if (totalXpRaw / 1000 > 1000) {
                formattedXp = Math.round(totalXpRaw / 1000 / 1000) + "MB"
            }
            const profileImage = user.avatarUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
            const passCount = user.auditSuccess.aggregate.count;
            const failCount = user.auditFail.aggregate.count;

            const xpTransactions = data.xp_transactions;
            const processedXpData = ProcessXpData(xpTransactions);


            container.innerHTML = `
            <div class="dashboard-wrapper">
                
                <header class="card header-card">
                    <div class="user-profile">
                        <div class="avatar-ring">
                            <img src="${profileImage}" alt="Profile" class="avatar-img">
                        </div>
                        <div class="user-details">
                            <h1 class="user-name">${user.firstName} ${user.lastName}</h1>
                            <p class="user-login">@${user.login}</p>
                        </div>
                    </div>
                    <button id="logout" class="btn-logout">Logout</button>
                </header>

                <div class="stats-row">
                    <div class="card stat-card">
                        <div class="stat-pill"></div>
                        <div class="stat-info">
                            <h3 class="stat-title">Total XP</h3>
                            <h2 class="stat-value">${formattedXp}</h2>
                        </div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-pill"></div>
                        <div class="stat-info">
                            <h3 class="stat-title">Audit Ratio</h3>
                            <h2 class="stat-value">${user.auditRatio.toFixed(1)}</h2>
                        </div>
                    </div>
                </div>

                <div class="graphs-row">
                    <div class="card graph-card">
                        <div class="graph-header">
                            <h3>XP Progression</h3>
                            <div class="graph-legend">
                                <span class="legend-dot xp-dot"></span> XP
                            </div>
                        </div>
                        <div id="svg-xp-coer" class="svg-box">
                        ${CreateXpLineChart(processedXpData)}
                            </div>
                    </div>
                    
                    <div class="card graph-card">
                        <div class="graph-header">
                            <h3>Audits statistics</h3>
                            <div class="graph-legend">
                                <span class="legend-dot pass-dot"></span> Pass
                                <span class="legend-dot fail-dot"></span> Fail
                            </div>
                        </div>
                        <div id="svg-audit-container" class="svg-box">
                          ${CreateAuditPieChart(passCount, failCount)}
                            </div>
                    </div>
                </div>

            </div>
        `;
            Logout()
        } catch (error) {
            console.error(error.message)
            RenderPopupError()
        }
    }, 100);

}
