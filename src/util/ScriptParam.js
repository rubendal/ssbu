import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function ReplaceScriptParam(match, p1, p2, p3, p4, offset, string, paramStyles) {
    const paramName = p1;
    const equal = p2;
    const value = p3;
    const commaOrParen = p4;
    let className = `script-param-${paramName}`;
    if (paramName in paramStyles) {
        className += ` param-style-${paramStyles[paramName]}`
    }
    return ReactDOMServer.renderToStaticMarkup(
        <span>
          <span className={`script-param ${className}`}>
            <span className='script-param-content' tabIndex='-1'>
              {paramName}{equal}<span className='script-param-value'>{value}</span>
            </span>
            <div className='description'>
              {GetDescriptionForParam(paramName, value)}
            </div>
          </span>{commaOrParen}
        </span>
    );
}

function GetDescriptionForParam(paramName, value) {
    switch (paramName) {
        case "ID":
            return (<span>
              Hitbox identifier,<br/>
              hitbox priority is defined by this value with 0 being the highest priority
            </span>);
        case "Part":
            return "Group hitbox is defined into, hitboxes with different part values are considered separate and can hit a single opponent even if another hitbox has landed and hasn't been removed";
        case "Bone":
            return "";
        case "Damage":
            return "";
        case "Angle":
            return "";
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
            return "";
        case "X":
            return "";
        case "Y":
            return "";
        case "Z":
            return "";
        case "X2":
            return "Stretch coordinate for extended hitboxes";
        case "Y2":
            return "Stretch coordinate for extended hitboxes";
        case "Z2":
            return "Stretch coordinate for extended hitboxes";
        case "Hitlag":
            return "";
        case "SDI":
            return "";
        case "Clang_Rebound":
            return "";
        case "FacingRestrict":
            return "";
        case "SetWeight":
            return "Hitbox property that ignores opponent's weight on KB calculation, when enabled every character hit with this hitbox will have their weight set to 100";
        case "ShieldDamage":
            return "";
        case "Trip":
            return "";
        case "Rehit":
            return "If it's not 0 it's the amount of frames a hitbox can hit again an opponent";
        case "Reflectable":
            return "";
        case "Absorbable":
            return "";
        case "Flinchless":
            return "Flag used on hitboxes to not make characters get damage animations nor hitstun but will still receive launch speed, also known as windboxes";
        case "DisableHitlag":
            return "Flag that makes hitlag = 0 regardless of damage and hitlag multipliers when enabled";
        case "Direct_Hitbox":
            return "";
        case "Ground_or_Air":
            const candidateList = [
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
            return "";
        case "FriendlyFire":
            return "Flag used for hitboxes that can hit user and teammates even with friendly fire enabled"; // "Team Damage" in Glossary
        case "Effect":
            return "";
        case "SFXLevel":
            return "";
        case "SFXType":
            return (<span>
              Sound Effect,<br/>represents the ID of the sound file to use when hitbox connects
            </span>);
        case "Type":
            return "";
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
        <div>
          <span className={className}>{candidate}</span>
          {description}
        </div>
    );
}

function DescribeCandidateList(candidateList, value) {
    return candidateList.map(([candidate, description]) =>
        DescribeCandidate(candidate, description, value))
}
