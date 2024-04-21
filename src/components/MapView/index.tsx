import Styles from './mapView.module.scss'

export default function MapView(){

    return (
        <div className={Styles.container}>
            <iframe className={Styles.iframeMap} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.984896802188!2d-49.2450741!3d-25.53888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfbb566eef661%3A0x1c27fb2b25e207ab!2sRua%20Expedicion%C3%A1rio%20Bruno%20Estrifica%2C%20268%20-%20Alto%20Boqueir%C3%A3o%2C%20Curitiba%20-%20PR%2C%2081850-370!5e0!3m2!1spt-BR!2sbr!4v1713668730724!5m2!1spt-BR!2sbr"></iframe>
        </div>
    )
}