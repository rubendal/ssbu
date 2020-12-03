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
              {GetDescriptionForParam(paramName)}
            </div>
          </span>{commaOrParen}
        </span>
    );
}

function GetDescriptionForParam(paramName) {
    const descriptions = {
        ID: (<span>
          Hitbox identifier,<br/>
          hitbox priority is defined by this value with 0 being the highest priority
        </span>),
        Part: "Group hitbox is defined into, hitboxes with different part values are considered separate and can hit a single opponent even if another hitbox has landed and hasn't been removed",
        Bone: "",
        Damage: "",
        Angle: "",
        BKB: (<span>
          Base KnockBack,<br/>
          minimum amount of knockback done regardless of damage and percent
        </span>),
        FKB: (<span>
          Fixed KnockBack,<br/>
          previously known as WBKB (Weight Based KnockBack), if it's not 0 the knockback formula uses this value as opponent's percent and ignores move damage, these moves will deal the same knockback regardless of their damage and percentage the opponent has but still varies by opponent's weight
        </span>),
        KBG: (<span>
          KnockBack Growth,<br/>
          in the knockback formula describes how much damage and percent scales
        </span>),
        Size: "",
        X: "",
        Y: "",
        Z: "",
        X2: "Stretch coordinate for extended hitboxes",
        Y2: "Stretch coordinate for extended hitboxes",
        Z2: "Stretch coordinate for extended hitboxes",
        Hitlag: "",
        SDI: "",
        Clang_Rebound: "",
        FacingRestrict: "",
        SetWeight: "Hitbox property that ignores opponent's weight on KB calculation, when enabled every character hit with this hitbox will have their weight set to 100",
        ShieldDamage: "",
        Trip: "",
        Rehit: "If it's not 0 it's the amount of frames a hitbox can hit again an opponent",
        Reflectable: "",
        Absorbable: "",
        Flinchless: "Flag used on hitboxes to not make characters get damage animations nor hitstun but will still receive launch speed, also known as windboxes",
        DisableHitlag: "Flag that makes hitlag = 0 regardless of damage and hitlag multipliers when enabled",
        Direct_Hitbox: "",
        Ground_or_Air: (<span>
          <span className='description-script'>COLLISION_SITUATION_MASK_A</span>
          hits opponents in air<br/>
          <span className='description-script'>COLLISION_SITUATION_MASK_G</span>
          hits opponents on ground<br/>
          <span className='description-script'>COLLISION_SITUATION_MASK_GA</span>
          hits opponents both in air and on ground
        </span>),
        Hitbits: "Value where each bit enables it to hit certain hurtboxes like characters, stage elements, items and enemies",
        CollisionPart: "",
        FriendlyFire: "Flag used for hitboxes that can hit user and teammates even with friendly fire enabled", // "Team Damage" in Glossary
        Effect: "",
        SFXLevel: "",
        SFXType: (<span>
          Sound Effect,<br/>represents the ID of the sound file to use when hitbox connects
        </span>),
        Type: ""
    };
    return descriptions[paramName] || "no description";
}
