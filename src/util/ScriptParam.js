import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function ReplaceScriptParam(match, p1, p2, p3, p4, offset, string, paramStyles) {
    const paramName = p1;
    const equal = p2;
    const value = p3;
    const commaOrParen = p4;
    const comma = (commaOrParen === ",") ? "," : "";
    const paren = (commaOrParen === ")") ? ")" : "";
    let className = `script-param-${paramName}`;
    if (paramName in paramStyles) {
        if (paramStyles[paramName] === "hide") {
            return paren;
        }
        className += ` param-style-${paramStyles[paramName]}`
    }
    return ReactDOMServer.renderToStaticMarkup(
        <span className={`script-param ${className}`}>
          <label>
            <span className='script-param-content'>
              {paramName}{equal}<span className='script-param-value'>{value}</span>
            </span>
            <input type="checkbox" name="checkbox"/>
            <div className='description'>
              {GetDescriptionForParam(paramName, value)}
            </div>{comma}
          </label>{paren}
        </span>
    );
}

function GetDescriptionForParam(paramName, value) {
    let candidateList;
    switch (paramName) {
        case "ID":
            return (<span>
                  Hitbox identifier,<br/>
                  hitbox priority is defined by this value with 0 being the highest priority
                </span>);
        case "Part":
            return "Group hitbox is defined into, hitboxes with different part values are considered separate and can hit a single opponent even if another hitbox has landed and hasn't been removed";
        case "Bone":
            return (<span>
              A part of the user which determines the axes for hitboxes
              in
              <span className="description-script">X</span>,
              <span className="description-script">Y</span>,
              <span className="description-script">Z</span>
              .<br/>
              Examples of values:
              <span className="description-script">top</span>,
              <span className="description-script">head</span>,
              <span className="description-script">armr</span>(meaning right arm),
              <span className="description-script">sword</span>
            </span>);
        case "Damage":
            return "Damage dealt to the opponent";
        case "Angle":
            return (<span>
              The Angle the opponent is sent.<br/>
              Angles larger than 360 has special meanings
              (see <a href="https://www.ssbwiki.com/Angle" target="_blank">SmashWiki</a> for details)
            </span>);
        case "BKB":
            return (<span>
              Base KnockBack,<br/>
              minimum amount of knockback done regardless of damage and percent
            </span>);
        case "FKB":
            return (<span>
              Fixed KnockBack,<br/>
              previously known as WBKB (Weight Based KnockBack), if it's not 0 the knockback formula uses this value as opponent's percent and ignores move damage, these moves will deal the same knockback regardless of their damage and percentage the opponent has but still varies by opponent's weight
            </span>);
        case "KBG":
            return (<span>
              KnockBack Growth,<br/>
              in the knockback formula describes how much damage and percent scales
            </span>);
        case "Size":
            return "Size of the hitbox";
        case "X":
        case "Y":
        case "Z":
            return (<span>
              Coordinate of the hitbox relative to
              <span className="description-script">Bone</span>
            </span>);
        case "X2":
        case "Y2":
        case "Z2":
            return "Stretch coordinate for extended hitboxes";
        case "Hitlag":
            return "Multiplier for HitLag";
        case "SDI":
            return (<span>
              Multiplier for Smash Directional Influence,<br/>
              easy to SDI if the value is larger than 1.0
            </span>);
        case "Clang_Rebound":
            return "no description";
        case "FacingRestrict":
            candidateList = [
                ["ATTACK_LR_CHECK_POS", "no description"],
                ["ATTACK_LR_CHECK_F", "no description"],
                ["ATTACK_LR_CHECK_B", "no description"],
            ]
            return (<span>
              Possible values are:
              {DescribeCandidateList(candidateList, value)}
            </span>);
        case "SetWeight":
            return "Hitbox property that ignores opponent's weight on KB calculation, when enabled every character hit with this hitbox will have their weight set to 100";
        case "ShieldDamage":
            return "Additional damage for opponent's shield.";
        case "Trip":
            return "Probability of the opponent tripping";
        case "Rehit":
            return "If it's not 0 it's the amount of frames a hitbox can hit again an opponent";
        case "Reflectable":
            return "If true, the attack is refelectable (e.g. by Fox's down special)";
        case "Absorbable":
            return "If true, the attack is absorbable (e.g. by Ness' down special)";
        case "Flinchless":
            return "Flag used on hitboxes to not make characters get damage animations nor hitstun but will still receive launch speed, also known as windboxes";
        case "DisableHitlag":
            return "Flag that makes hitlag = 0 regardless of damage and hitlag multipliers when enabled";
        case "Direct_Hitbox":
            return "no description";
        case "Ground_or_Air":
            candidateList = [
                ["COLLISION_SITUATION_MASK_A", "hits opponents in air"],
                ["COLLISION_SITUATION_MASK_G", "hits opponents on ground"],
                ["COLLISION_SITUATION_MASK_GA", "hits opponents both in air and on ground"],
            ];
            return (
                <span>
                  Possible values are:
                  {DescribeCandidateList(candidateList, value)}
                </span>);
        case "Hitbits":
            return "Value where each bit enables it to hit certain hurtboxes like characters, stage elements, items and enemies";
        case "CollisionPart":
            return "no description";
        case "FriendlyFire":
            return "Flag used for hitboxes that can hit user and teammates even with friendly fire enabled"; // "Team Damage" in Glossary
        case "Effect":
            return "no description";
        case "SFXLevel":
            return "Loudness of the Sound Effect";
        case "SFXType":
            return (<span>
              Sound Effect,<br/>represents the ID of the sound file to use when hitbox connects
            </span>);
        case "Type":
            return "no description";
        default:
            return "no description";
    }
}

function DescribeCandidate(candidate, description, value) {
    let className = "description-script";
    if (candidate === value) {
        className += " current-value";
    }
    return (
        <div key={candidate}>
          <span className={className}>{candidate}</span>
          {description}
        </div>
    );
}

function DescribeCandidateList(candidateList, value) {
    return candidateList.map(([candidate, description]) =>
        DescribeCandidate(candidate, description, value))
}
