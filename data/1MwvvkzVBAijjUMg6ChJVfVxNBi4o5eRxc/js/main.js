/*
 * Udemy Course List
 *
 * List of Udemy Courses with magnet links available
 * (all torrents are made available by the creator of this zite)
 */

/*
 * Page
 */
class Page extends ZeroFrame {
    constructor() {
        super()

        this.data = null
        this.loading = true
    }

    onOpenWebsocket() {
        this.cmd( 'fileGet', { inner_path: 'data/data.json', required: true }, ( data ) => {
            if ( data ) {
                this.data = JSON.parse( data )
            }
            else {
                this.error = 'Could not get contents of file data/data.json, uhm ?'
            }

            this.loading = false
            m.redraw()
        } )
    }

    view() {
        if ( this.loading ) {
            return m( 'p.t-center', 'Loading courses...' )
        }

        if ( this.error ) {
            return m( 'p.t-center', this.error )
        }

        return m( 'div', [
            this.data.sections.map( ( section ) => {
                return m( SectionComponent, section )
            } ),

            m('br'),
            m('br'),
            m('br')
        ] )
    }
}

/*
 * Section component (torrent list for one language)
 */
class SectionComponent {
    view( vnode ) {
        return m( 'div.section', [
            m( 'h2', [
                vnode.attrs.name,

                m('span.t-muted', ' (' + vnode.attrs.torrents.length + ')')
            ] ),

            m( 'table.table', [
                m( 'thead', [
                    m( 'tr', [
                        m( 'th', 'Name' ),
                        m( 'th', 'Size' ),
                        m( 'th.t-right', 'Actions' )
                    ] )
                ] ),

                m( 'tbody', [
                    vnode.attrs.torrents.map( ( torrent ) => {
                        return m( 'tr', [
                            m( 'td', torrent.title ),
                            m( 'td', torrent.size ),
                            m( 'td.t-right', [
                                m('a', { href: torrent.url }, 'View on Udemy (CN)'),
                                m.trust(' &nbsp;'),
                                m('a', { href: torrent.magnet }, 'Magnet'),
                            ] ),
                        ] )
                    } )
                ] )
            ] )
        ] )
    }
}

// Finally, mount
m.mount( document.getElementById( 'main' ), Page )