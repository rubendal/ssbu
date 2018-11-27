export function ToHex(number){
    var hex = "00000000" + number.toString(16).toUpperCase();
    return "0x" + hex.substr(-8);
}

export function ToByteHex(number){
    var hex = "00" + number.toString(16).toUpperCase();
    return "0x" + hex.substr(-2);
}

export function ToHexWithoutPadding(number){
    return "0x" + number.toString(16).toUpperCase();
}

function ToHexWithPadding(number, pad){
    var padding = "";
    for(var i=0;i<pad;i++){
        padding +="0";
    }
    var hex = padding + number.toString(16).toUpperCase();
    return "0x" + hex.substr(-pad);
}

export function IsScriptEmpty(script){
    return script.Game === null && script.Expression === null && script.Effect === null && script.Sound === null;
}

function FormatScript(script){
    return "<span>" + 
            script
                .replace(/\r\n/g, "</span><br/><span>")
                .replace(/{<\/span><br\/><span>/g, "{</span><div class='script-tab'><span>")
                .replace(/}<\/span><br\/><span>/g, "</span></div>}<br/><span>")
                .replace(/(=)(-?[0-9A-F]+x?\.?[0-9A-F]*)(,|\))/g, "$1<span class='script-param-value'>$2</span>$3")
                .replace(/([a-zA-Z_0-9/]+)(\()/g, "<span class='script-cmd'>$1</span>$2")
                .replace(/<span><\/span>/g,"");
}

export function BuildScript(script){
    var s = "";

    if(script.Game !== null){
        s += "Game<br/>{<br/><div class='script-tab'>" + FormatScript(script.Game) + "</div>}<br/>";
    }
    if(script.Expression !== null){
        s += "Expression<br/>{<br/><div class='script-tab'>" + FormatScript(script.Expression) + "</div>}<br/>";
    }
    if(script.Effect !== null){
        s += "Effect<br/>{<br/><div class='script-tab'>" + FormatScript(script.Effect) + "</div>}<br/>";
    }
    if(script.Sound !== null){
        s += "Sound<br/>{<br/><div class='script-tab'>" + FormatScript(script.Sound) + "</div>}<br/>";
    }

    return s;
}

export function FormatSearchScript(script, regex){
    return "<span>" + 
            script
                .replace(/\r\n/g, "</span><br/><span>")
                .replace(/{<\/span><br\/><span>/g, "{</span><div class='script-tab'><span>")
                .replace(/}<\/span><br\/><span>/g, "</span></div>}<br/><span>")
                .replace(regex, "<span class='regex-match'>$1</span>")
                .replace(/(=)(-?[0-9A-F]+x?\.?[0-9A-F]*)(,|\)|<)/g, "$1<span class='script-param-value'>$2</span>$3")
                .replace(/([a-zA-Z_0-9/]+)(\(|<)/g, "<span class='script-cmd'>$1</span>$2");
                
}

export function FormatMscScript(script){
    return "<span>" + 
            script
                .replace(/("([^"]*)")/g, "<span class='msc-string'>$1</span>")
                .replace(/(=)(-?[0-9A-F]+x?\.?[0-9A-F]*)(,|\))/g, "$1<span class='script-param-value'>$2</span>$3")
                .replace(/([a-zA-Z_0-9/]+)(\()/g, "<span class='msc-script-function'>$1</span>$2")
                .replace(/(int |float |void |if |else |else\n)/g, "<span class='msc-reserved'>$1</span>")
                .replace(/(0x[0-9a-f]+)/g, "<span class='msc-number'>$1</span>")
                .replace(/\n/g, "</span><br/><span>")
                .replace(/{<\/span><br\/><span>/g, "{</span><div class='script-tab'><span>")
                .replace(/}<\/span><br\/><span>/g, "</span></div>}<br/><span>")
                
}

/*export function SimpleFormatMscScript(script){
    return "<span>" + 
            script
                .replace(/\r\n/g, "</span><br/><span>")
                .replace(/{<\/span><br\/><span>/g, "{</span><div class='script-tab'><span>")
                .replace(/}<\/span><br\/><span>/g, "</span></div>}<br/><span>")
                
}*/

export function PrintHitboxActive(active){
    var start = active.Start + 1;
    if (start === 0)
        start = 1;

    var end = active.End;

    if (end === -1)
        return `${start} -`;

    if (end === 0)
        end = 1;

    if (start === end)
        return `${start}`;

    return `${start} - ${end}`;
}

export function ParseRemoveType(type){
    switch(type){
        case 0: //Removed
            return "Removed";
        case 1: //Overwritten
            return "Overwritten";
        case 2: //Updated
            return "Updated";
        case 3: //ThrowApplier
            return "Throw Applied";
        case 4: //Script_End()
            return "Script End";
        default:
        return "Script End";
    }
}

export function ParseEffect(effect){
    switch(effect){
        case 0:
        return "None";
        case 1:
        return "Detect";
        case 2:
        return "Slash";
        case 3:
        return "Electric";
        case 4:
        return "Freezing";
        case 5:
        return "Flame";
        case 6:
        return "Coin";
        case 7:
        return "Reverse";
        case 8:
        return "Slip";
        case 9:
        return "Sleep";
        case 0xb:
        return "Bury";
        case 0xc:
        return "Stun";
        case 0xe:
        return "Flower";
        case 0x10:
        return "Death";
        case 0x11:
        return "Grass";
        case 0x12:
        return "Water";
        case 0x13:
        return "Darkness";
        case 0x14:
        return "Paralyze";
        case 0x15:
        return "Aura";
        case 0x16:
        return "Plunge";
        case 0x17:
        return "Down";
        case 0x18:
        return "Adhension";
        case 0x19:
        return "Stab";
        case 0x1a:
        return "Magic";
        case 0x1b:
        return "Flinchless1";
        case 0x1c:
        return "Flinchless2";
        case 0x1d:
        return "Solar";
        case 0x1e:
        return "Crumple";
        case 0x1f:
        return "Disable";
        case 0x20:
        return "Pin";
        case 0x21:
        return "Death2";
        case 0x24:
        return "Bullet Arts";
        case 0x25:
        return "Can/Final Smash";
        default:
        return ToHexWithPadding(effect, 2);
    }
}

export function ParseScriptCondition(condition, value){
    switch(condition){
        case 0:
        return "< " + value;
        case 1:
        return "<= " + value;
        case 2:
        return "= " + value;
        case 3:
        return "!= " + value;
        case 4:
        return ">= " + value;
        case 5:
        return "> " + value;
        case 10:
        return "bit flag enabled";
        case 11:
        return "bit flag disabled";
        case 20:
        return "else";
        default:
        return "?";
    }
}

export function ParseHurtboxState(state){
    switch(state){
        case 0:
            return "Normal";
        case 1:
            return "Invincible";
        case 2:
            return "Intangible";
        case 3:
            return "Invincible/Intangible";
        case 10:
            return "Super Armor enabled";
        case 11:
            return "Super Armor disabled";
        default:
            return "";
    }
}