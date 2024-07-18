import React from 'react'

function Footer({configAppData}) {
    return (
        <div className="pagination7">
            <div className="gemfind-app-store5">
                © 2024 GemFind App Store {configAppData.show_powered_by && 'Powered by GemFind'}.
            </div>
        </div>
    )
}

export default Footer