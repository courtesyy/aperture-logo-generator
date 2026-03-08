import { useState } from 'react';
import '../app.css';

export function LogoGenerator() {
    const [logoTitleText, setLogoTitleText] = useState("Aperture");
    const [logoSubtitleText, setLogoSubtitleText] = useState("Laboratories");
    const [leftGap, setLeftGap] = useState(0);
    const [logoScale, setLogoScale] = useState(70);
    const titleLeftGap = 3.1;
    const subtitleLeftGapOffset = 1;
    const fontExplanation = "Just so you know, the header font (the \"APERTURE\" part) is slightly incorrect. I found a source saying it uses \"Univers Black Oblique\", but the version I have is  about 90% accurate to the logo. Did the designers at Valve manually edit the font when they made the logo? Did I download a mislabeled font? Did I mix up \"italic\" and \"oblique\" in the wrong direction? If you're a typography freak, you probably care about this, so contact me if you know how to fix this. If you aren't, don't even worry. It's fine.";

    return (
        <div className="parentElement">
            <div
                className="logo"
                style={{scale: logoScale + "%"}}
            >
                <svg
                    className="logoIris"
                    viewBox="0 0 955.58865 992.41201"
                    >
                    <path
                        fill="#000000"
                        d="m453.3405 991.4766c-40.6835-3.9494-101.3296-16.9493-102.8326-22.0429-.4494-1.523-12.8104-63.5383-27.4689-137.8118-14.6585-74.2735-27.0839-136.4797-27.6119-138.236-.5741-1.9096 78.1311 49.6298 195.7807 128.2051 108.2074 72.2691 196.7496 131.8067 196.7604 132.3057.0523 2.4136-50.0966 19.091-76.0487 25.2904-36.7805 8.7862-65.8176 12.3416-106.8376 13.0816-20.2137.3646-43.4973.009-51.7414-.7921zM287.7172 947.2111C199.3016 906.858 121.0085 836.6165 70.182 752.0471l-13.1455-21.8726 79.5087-119.2555c45.1936-67.7861 79.8643-118.1947 80.3328-116.7977.4532 1.3518 20.9331 103.9963 45.5108 228.0988 24.5777 124.1026 45.0909 227.3718 45.5847 229.4872.4938 2.1154.2375 3.8401-.5695 3.8326-.8071-.007-9.6661-3.7554-19.6868-8.3289zm323.5905-91.2082c-65.047-43.3594-117.6734-79.3649-116.9474-80.0123 1.433-1.2779 460.3924-92.7185 461.188-91.8846.9734 1.0202-15.9403 36.8539-24.8483 52.6442-35.6638 63.2177-79.6271 113.7912-135.8746 156.3039-17.1262 12.9443-46.7445 32.2347-59.9756 39.0622l-5.2748 2.7219zM31.7168 673.3289c-13.1754-34.5031-24.5796-81.3004-29.534-121.1942-3.3026-26.5924-2.7582-94.8565.961-120.5128 2.966-20.4605 10.7992-58.0662 15.1327-72.6496l2.2859-7.6923 139.172-27.7316c76.5446-15.2524 139.4758-27.4278 139.8471-27.0565.9989.9989-259.4873 390.6855-261.1539 390.6855-.7824 0-3.8022-6.2319-6.7108-13.8486zm698.3012-401.9851c-25.0755-126.206-45.9946-230.8068-46.4869-232.4462-1.146-3.8166-.4173-3.5588 27.5337 9.7409 76.4453 36.3743 144.8782 94.4584 192.6707 163.534 15.6339 22.5961 30.9473 48.9129 29.951 51.4724-.4635 1.1908-36.2203 55.0399-79.4597 119.6647l-78.617 117.4996zm-693.3122 35.6794c0-1.131 6.5309-15.2079 14.513-31.2819 37.0615-74.633 90.2814-136.8926 158.9913-185.9973 17.7679-12.6981 50.226-31.9556 52.7396-31.2905 2.7938.7391 237.0858 157.4171 236.4092 158.0938-.308.308-103.1848 20.9342-228.6151 45.8358-125.4303 24.9017-229.4012 45.5955-231.0465 45.9862-1.6453.3907-2.9915-.215-2.9915-1.3461zm463.3019-136.9484c-107.4976-71.8933-195.7609-131.0258-196.1406-131.4056-1.0538-1.0538 25.3513-10.8333 47.3686-17.5437 47.5379-14.4884 93.4497-21.1223 146.2049-21.1255 46.2567-.003 88.6773 5.5617 130.7675 17.1532l12.8699 3.5443 27.8361 139.4001c15.3098 76.67 27.5453 139.6908 27.19 140.0462-.3554.3553-88.5987-58.1757-196.0963-130.0691z"
                    />
                </svg>
                <div
                    className="logoTitle"
                    style={{marginLeft: (leftGap - titleLeftGap) + "rem"}}
                >
                    {logoTitleText.toUpperCase()}
                    <div
                        className="logoSubtitle"
                        style={{marginLeft: (titleLeftGap + subtitleLeftGapOffset) + "rem"}}
                    >
                        {logoSubtitleText.toUpperCase()}
                    </div>
                </div>
            </div>
            <div className="fields">
                <label>
                    Size
                    <input
                        type="range" min="20" max="100" defaultValue="70" step="1" className="slider"
                        onChange={e => setLogoScale(e.target.valueAsNumber)}
                        />
                </label>
                <label>
                    Left gap
                    <input
                        type="range" min="0" max="2" defaultValue="0" step=".5" className="slider"
                        onChange={e => setLeftGap(e.target.valueAsNumber)}
                        />
                </label>
                <label>
                    Title text
                    <input
                        name="titleInput" defaultValue={logoTitleText}
                        onChange={e => setLogoTitleText(e.target.value)}
                    />
                </label>
                <label>
                    Subtitle text
                    <input
                        name="subtitleInput" defaultValue={logoSubtitleText}
                        onChange={e => setLogoSubtitleText(e.target.value)}
                    />
                </label>
            </div>
            <div className="footer">
                <div>
                    Made by Courtesy <a href="">(source)</a> 
                    <a href="" title={fontExplanation}>
                        (?)
                    </a>
                </div>
                <div>
                    v0.0.0
                </div>
            </div>
        </div>
    );
}