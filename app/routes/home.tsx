import type { Route } from "./+types/home";
import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router";
import { snapdom } from '@zumer/snapdom'; 
import '../app.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aperture Logo Generator" },
    { name: "description", content: "Generate the Aperture Laboratories logo with custom text." },
  ];
}

export default function LogoGenerator() {
    const version: string = "1.0.0";
    const subtitleLineHeight: number = 30;
    const [logoTitleText, setLogoTitleText] = useState<string>("Aperture");
    const [logoSubtitleText, setLogoSubtitleText] = useState<string[]>(["Laboratories"]);
    const [leftGap, setLeftGap] = useState<number>(0);
    const [viewBoxWidth, setViewBoxWidth] = useState<number>(625);
    const [viewBoxHeight, setViewBoxHeight] = useState<number>(221);
    const viewArea = useRef<null | SVGSVGElement>(null);
    const logoWhiteBg = useRef<null | SVGRectElement>(null);

    useEffect(() => {
        //Update viewbox size to svg bounding box area
        if (viewArea.current) {
            const BBox = viewArea.current.getBBox();
            setViewBoxWidth(Math.max((BBox.width + BBox.x), 150));
            setViewBoxHeight(Math.max((BBox.height + BBox.y), 154));
        }
    }, [logoTitleText, logoSubtitleText]);
    
    async function saveSvg() {
        const props: object = {format: 'svg', filename: 'logo.svg', embedFonts: true};
        await snapdom.download(document.querySelector("#svgLogo")!, props);
    }

    async function savePng(whiteBg: boolean) {
        const props: object = {format: 'png', filename: 'logo.png', embedFonts: true};
        if (whiteBg && logoWhiteBg.current) {
            //Set white bg, save image, unset white bg
            logoWhiteBg.current.setAttribute("fill-opacity", "1");
            await snapdom.download(document.querySelector("#svgLogo")!, props);
            logoWhiteBg.current.setAttribute("fill-opacity", "0");
        }
        else {
            await snapdom.download(document.querySelector("#svgLogo")!, props);
        }
    }

    function updateLogoTitleText(text: string) {
        setLogoTitleText(text);
        //Kerning info of leading character against iris shape
        const paddingGroup0: string[] = ["A", "J", "+", ".", "<", "^", "~", "¢", "«", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ"];
        const paddingGroup12: string[] = ["C", "G", "O","Q", "S", "1", "2", "3", "4", "6", "8", "9", "0", "#", "*", "-", "/", "=", ">", "´", "»", "Ò", "Ó", "Ô", "Õ", "Ö", "Ø", "“", "”", "†", "‡", "•", "‹", "›", "∙"];
        const paddingGroup30: string[] = ["(", "\\", "`", "{", "¡", "¶"];
        const paddingGroup40: string[] = [")", ";", "[", "]", "_", "}", "¿", "ƒ"];
        const paddingGroupNeg10: string[] = [",", "¸", "„", "…"];
        if (paddingGroup12.includes(text.charAt(0).toUpperCase())) {
            setLeftGap(12);
        }
        else if (paddingGroup0.includes(text.charAt(0).toUpperCase())) {
            setLeftGap(0);
        }
        else if (paddingGroup40.includes(text.charAt(0).toUpperCase())) {
            setLeftGap(40);
        }
        else if (paddingGroup30.includes(text.charAt(0).toUpperCase())) {
            setLeftGap(30);
        }
        else if (paddingGroupNeg10.includes(text.charAt(0).toUpperCase())) {
            setLeftGap(-10);
        }
        else {
            setLeftGap(18);
        }
    }

    function updateLogoSubtitleText(text: string) {
        setLogoSubtitleText(text.split('\n'));
    }

    function svgLogo() {
        return (
            <svg
                viewBox={"0 0 " + viewBoxWidth + " " + viewBoxHeight}
                id ="svgLogo"
            >
                <defs>
                    <clipPath id="clipCircle">
                    <circle r="125.5"/>
                    </clipPath>
                    <clipPath id="clipCircleInner">
                    <path d="m-187.233-69 101.117-101.116L15-69-86.116 32.116z"/>
                    </clipPath>
                </defs>
                <rect
                    ref={logoWhiteBg}
                    width="100%"
                    height="100%"
                    x="0" y="0"
                    fill="#ffffff"
                    fillOpacity="0"
                ></rect>
                <g clipPath="url(#clipCircle)" transform="matrix(.574 -.114 .114 .574 77 76)">
                    <g id="shutterComponent">
                        <path id="shutterSubComponent" d="M-128-212H15v143h-143z" clipPath="url(#clipCircleInner)"/>
                        <use href="#shutterSubComponent" transform="scale(-1)"/>
                    </g>
                    <use href="#shutterComponent" transform="rotate(45)"/>
                    <use href="#shutterSubComponent" transform="rotate(-45)"/>
                    <use href="#shutterComponent" transform="rotate(90)"/>
                </g>
                <g ref={viewArea}>
                    <text
                        className="logoTitle"
                        x={120 + leftGap}
                        y="99.2"
                        key="titleText"
                    >
                        {logoTitleText.toUpperCase()}
                    </text>
                    {logoSubtitleText.map( (val, num) =>
                        <text
                            className="logoSubtitle"
                            x="158"
                            y={130.5 + (num * subtitleLineHeight)}
                            key={"subtitleText" + num}
                        >
                            {val.toUpperCase()}
                        </text>
                    )}
                </g>
            </svg>
        );
    }

    return (
        <div className="parentElement">
            <div className="fields">
                <label>
                    Title text
                    <input
                        name="titleInput" defaultValue={logoTitleText} autoComplete="off"
                        onChange={e => updateLogoTitleText(e.target.value)}
                    />
                </label>
                <label>
                    Subtitle text <small>(Line breaks allowed)</small>
                    <textarea
                        name="subtitleInput" defaultValue={logoSubtitleText} autoComplete="off"
                        onChange={e => updateLogoSubtitleText(e.target.value)}
                    />
                </label>
                <div className="verticalButtons">
                    <span className="material-symbols-outlined downloadIcon">download</span>
                    <button onClick={e => saveSvg()}>
                        svg
                    </button>
                    <button onClick={e => savePng(false)}>
                        png
                    </button>
                    <button onClick={e => savePng(true)}>
                        png, white bg
                    </button>
                </div>
            </div>
            {svgLogo()}
            <div className="footer">
                <div className="footerSubdiv">
                    Made by Courtesy
                    <Link to="https://courtesycalling.com" className="material-symbols-outlined">home</Link>
                    <span
                        className="material-symbols-outlined footerTooltip"
                        title="Original svg file: Valve, Inc, Public domain, via Wikimedia Commons
Note: the header font is slightly incorrect. Although I saw somebody identify it as Univers Black Oblique, there are discrepancies. I made some manual corrections, but they aren't perfect. Please contact me if you know what the issue is!"
                    >
                        info
                    </span>
                </div>
                <Link to="https://github.com/courtesyy/aperture-logo-generator">
                    v{version}
                </Link>
            </div>
        </div>
    );
}
