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
    //Changed: Remove param description display if it doesn't have one, mostly for non-ATTACK functions
    //Those can be added later
    return ReactDOMServer.renderToStaticMarkup(
        <span className={`script-param ${className}`}>
            <label>
                <span className='script-param-content'>
                    {paramName}{equal}<span className='script-param-value'>{value}</span>
                </span>
                {
                    GetDescriptionForParam(paramName, value) != "no description" && (
                        <span>
                            <input type="checkbox" name="checkbox" />
                            <div className='description'>
                                {GetDescriptionForParam(paramName, value)}
                            </div>
                        </span>
                    )
                }
                {comma}
            </label>{paren}
        </span>
    );
}

function GetDescriptionForParam(paramName, value) {
    // paramName: string, value: string
    // 'value' is the current value given for the parameter 'paramName'
    let candidateList;
    switch (paramName) {
        case "ID":
            return (<span>
                Hitbox identifier,<br />
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
              .<br />
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
                The Angle the opponent is sent.<br />
              Angles larger than 360 has special meanings
              (see <a href="https://www.ssbwiki.com/Angle" target="_blank">SmashWiki</a> for details)
            </span>);
        case "BKB":
            return (<span>
                Base KnockBack<br />
              Minimum amount of knockback done regardless of damage and percent
            </span>);
        case "FKB":
            return (<span>
                Fixed KnockBack<br />
              Previously known as WBKB (Weight Based KnockBack), if it's not 0 the knockback formula uses this value as opponent's percent and ignores move damage, these moves will deal the same knockback regardless of their damage and percentage the opponent has but still varies by opponent's weight
            </span>);
        case "KBG":
            return (<span>
                KnockBack Growth<br />
              Indicates how knockback scales based on opponent's percent and hitbox base damage
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
            return "Multiplier for Hitlag";
        case "SDI":
            return (<span>
                Multiplier for Smash Directional Influence distance
            </span>);
        case "Clang_Rebound":
            candidateList = [
                ["ATTACK_SETOFF_KIND_OFF", "Doesn't interact (transcendent)"],
                ["ATTACK_SETOFF_KIND_ON", "Interacts with other hitboxes by clanking, causes rebound if hitbox doesn't deal more than 9% more damage than opposing hitbox"],
                ["ATTACK_SETOFF_KIND_THRU", "Interacts with other hitboxes by clanking, doesn't cause rebound"],
                ["ATTACK_SETOFF_KIND_NO_STOP", "Interacts with other hitboxes by clanking, unique to Mii Gunner Grenade Launch"]
            ]
            return (<span>
                Indicates how hitbox interacts with other hitboxes
                {DescribeCandidateList(candidateList, value)}
            </span>);
        case "FacingRestrict":
            candidateList = [
                ["ATTACK_LR_CHECK_POS", "Launch direction is determined by character's Trans bone position"],
                ["ATTACK_LR_CHECK_F", "Launch direction will be the same as the direction this character front is facing"],
                ["ATTACK_LR_CHECK_B", "Launch direction will be the same as the direction this character back is facing"],
                ["ATTACK_LR_CHECK_SPEED", "Launch direction is based on the character/projectile direction it's moving"],
                ["ATTACK_LR_CHECK_PART","Launch direction is determined by hitbox bone position"],
                ["ATTACK_LR_CHECK_LEFT","Replaces angle to launch where it originated, used on Rosalina's Final Smash small stars"],
                ["ATTACK_LR_CHECK_BACK_SLASH","Calculates launch angle using opponent's back direction, used in Shulk's Backslash"]
            ]
            return (<span>
                Indicates how launch direction and opponent facing direction be when hit
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
            return "Flag that indicates if hitbox isn't a projectile";
        case "Ground_or_Air":
            candidateList = [
                ["COLLISION_SITUATION_MASK_A", "Hits opponents in air"],
                ["COLLISION_SITUATION_MASK_G", "Hits opponents on ground"],
                ["COLLISION_SITUATION_MASK_GA", "Hits opponents both in air and on ground"],
                ["COLLISION_SITUATION_MASK_G_d", "Hits opponents on ground but not downed"],
                ["COLLISION_SITUATION_MASK_GA_d", "Hits opponents both in air and on ground but not downed"]
            ];
            return (
                <span>
                    Indicates if hitbox interacts with opponents in the ground and in the air
                    {DescribeCandidateList(candidateList, value)}
                </span>);
        case "Hitbits":
            return "Value where each bit enables it to hit certain hurtboxes like characters, stage elements, items and enemies";
        case "CollisionPart":
            return "Indicates which hurtboxes types hitbox can interact with (head, body, arms)";
        case "FriendlyFire":
            return "Flag used for hitboxes that can hit user and teammates even with friendly fire disabled";
        case "Effect":
            candidateList = [
                ['hash40("collision_attr_normal")', "Normal effect"],
                ['hash40("collision_attr_fire")', "Fire effect"],
                ['hash40("collision_attr_elec")', "Electric effect, multiplies hitlag x1.5"],
                ['hash40("collision_attr_ice")', "Freezing effect, can freeze opponents"],
                ['hash40("collision_attr_bury")', "Bury effect, opponents will be buried into the ground based on KB and opponent %"],
                ['hash40("collision_attr_cutup")', "Slash effect"],
                ['hash40("collision_attr_sting")', "Stab effect"],
                ['hash40("collision_attr_magic")', "Magic effect"],
                ['hash40("collision_attr_paralyze")', "Paralyze effect, opponents will be paralyzed based on hitlag and KB"],
                ['hash40("collision_attr_purple")', "Darkness effect"],
                ['hash40("collision_attr_search")', "Searchbox, used to detect opponents to initiate a move like Raptor Boost and Upperdash/Electroshock Arm"],
                ['hash40("collision_attr_water")', "Water effect"],
                ['hash40("collision_attr_aura")', "Aura effect"],
                ['hash40("collision_attr_rush")', "Rapid effect, used on rapid jabs"],
                ['hash40("collision_attr_ink_hit")', "Ink effect"],
                ['hash40("collision_attr_turn")', "Reverse effect, turns opponents around (Cape)"],
                ['hash40("collision_attr_mario_local_coin")', "Mario Coin effect, can generate yellow or purple coins visual effects"],
                ['hash40("collision_attr_coin")', "Coin effect, generates yellow coin visual effect"],
                ['hash40("collision_attr_curse_poison")', "Poison effect, only causes visual effect (Eiha/Eigahon)"],
                ['hash40("collision_attr_dedede_hammer")', "Dedede Hammer effect, same as normal effect"],
                ['hash40("collision_attr_whip")',"Whip effect, used Simon/Richter hitboxes"],
                ['hash40("collision_attr_saving")',"Focus Attack effect"],
                ['hash40("collision_attr_lay")',"Down effect, causes the opponent to lay down on the ground"],
                ['hash40("collision_attr_taiyo_hit")',"Sun Salutation effect"],
                ['hash40("collision_attr_bind")',"Stun effect"],
                ['hash40("collision_attr_bind_extra")',"Stun effect used on Mewtwo's Disable"]

            ];
            return (
                <span>
                    Indicates the effect of the hitbox
                    {DescribeOnlyCandidateValue(candidateList, value)}
                </span>);
        case "SFXLevel":
            return "Loudness of the Sound Effect";
        case "SFXType":
            return (<span>
                Sound Effect, represents the ID of the sound file to use when hitbox connects
            </span>);
        case "Type":
            return "Indicates hitbox type, used for modifiers for spirit traits";
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
    // 'value' is the current value which will be highlighted in the description
    return candidateList.map(([candidate, description]) =>
        DescribeCandidate(candidate, description, value))
}

function DescribeOnlyCandidateValue(candidateList, value) {
    let match = candidateList.find(([candidate, val]) => candidate === value);
    if(match){
        return DescribeCandidate(match[0],match[1], value);
    }
    return null;
}