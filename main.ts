import ko from 'knockout'

export function toHex(n: number, digits: number = 2): string {
    return n.toString(16).padStart(digits, "0").toUpperCase()
}

export function fromHex(s: string): number | null {
    // parseint is very lenient with what it accepts
    if (s.match(/^(?:0x)?[0-9a-fA-F]+$/) == null)
        return null
    let n = parseInt(s, 16);
    return Number.isNaN(n) ? null : n;
}

ko.extenders['asHex'] = function (target: KnockoutObservable<number>, digits: number) {
    return ko.pureComputed({
        read: () => toHex(target(), digits),
        write: (value) => {
            let v = fromHex(value)
            if (v === null) return;
            target(v)
        },
    })
}

class VM {
    value = ko.observable(0);
    value_as_hex = this.value.extend({asHex: 2});
}

ko.applyBindings(new VM())