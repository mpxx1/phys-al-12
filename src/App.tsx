import './App.css'
import {useEffect, useRef, useState} from "react"


function App() {
    const [wavelength, setWavel] = useState("")
    const [rIndexLens, setRIndexLens] = useState("")
    const [rIndexPlate, setRIndexPlate] = useState("")
    const [rIndexEnv, setRIndexEnv] = useState("")
    const [lensRadius, setLensRadius] = useState("")

    const wl = Number.parseFloat(wavelength) * Math.pow(10, -9)
    const ril = Number.parseFloat(rIndexLens)
    const rip = Number.parseFloat(rIndexPlate)
    const rie = Number.parseFloat(rIndexEnv)
    const r = Number.parseFloat(lensRadius)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const arr: number[] = []
    const width: number = 700
    const height: number = 700

    if (ril < 1 || rip < 1 || rie < 1)
        alert("Refractive indexes must be >= 1")

    if (wl <= 0)
        alert("Wavelength must be greater than 0")

    if (r <= 0)
        alert("Lens radius must be greater than 0")


    const rFrenel = Math.pow((rip - rie) / (rip + rie), 2);
    const tFrenel = 4 * ril * rie / (Math.pow((ril + rie), 2));
    const k = 2 * Math.PI / wl;

    for (let i = 0; i <= 0.001; i += 0.000001) {
        const I2 = 1 * rFrenel
        const I1 = I2 * tFrenel * tFrenel
        const opt = 2 * (i * i / (2 * r)) * rie + wl / 2

        arr.push(I1 + I2 + 2 * I2 * tFrenel * Math.cos(k * opt))
    }

    useEffect(() => {
        if (canvasRef.current == null)
            alert("Your browser does not support canvas, update it or use modern one to see the result")

        else

            for (let i = 0; i < arr.length; i += 3) {
                const clr = 255 * arr[i]
                const ctx = canvasRef.current.getContext("2d")

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.beginPath();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.arc(width / 2, height / 2, i / 3, 0, 2 * Math.PI);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.strokeStyle = `rgb(${clr}, ${clr}, ${clr})`;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.stroke();
            }

    }, [arr, canvasRef]);


    return (
        <div className={"wrapper"}>
            <div className={"inputWrapper"}>
                <label> Enter values to see final model </label>

                <div>
                    <input
                        placeholder={"Wavelength, nm"}
                        value={wavelength}
                        onChange={(event) => setWavel(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Refractive lens index"}
                        value={rIndexLens}
                        onChange={(event) => setRIndexLens(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Refractive plate index"}
                        value={rIndexPlate}
                        onChange={(event) => setRIndexPlate(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Refractive env index"}
                        value={rIndexEnv}
                        onChange={(event) => setRIndexEnv(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Lens radius, m"}
                        value={lensRadius}
                        onChange={(event) => setLensRadius(event.target.value)}
                    />
                </div>
            </div>

            <div className={"canvasWrapper"}>
                <label> Visualization of Newton's rings </label>
                <canvas ref={canvasRef} height={height} width={width}/>
            </div>
        </div>
    )
}

export default App
