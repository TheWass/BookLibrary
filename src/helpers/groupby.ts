export interface Group<T> {
    key: Record<string, unknown>;
    items: T[];
}

export interface GroupBy {
    keys: string[];
    thenby?: GroupBy;
}

export const groupBy = <T extends Record<string, unknown>>(array: Array<T>, grouping: GroupBy, removeKeys = false): Array<Group<T|Group<T>>> => {
    const keys = grouping.keys;
    const sortedGroups: Array<Group<T>> = array.reduce((groups: Array<Group<T>>, item: T) => {
        // Find the group in the reducing list of groups
        const group = groups.find((g: Group<T>) => keys.every(key => item[key] === g.key[key]));

        // Remove keys from object.
        const keylessItem: T = Object.getOwnPropertyNames(item)
            .filter(prop => !keys.find(key => key === prop))
            .reduce((o, key) => ({ ...o, [key]: item[key] }), {} as T);
        
        const data = removeKeys ? keylessItem : item;
        if (group) {
            // If the group is found, add the item to the group.  (Creating a new instance in the process)
            return groups.map((g: Group<T>) => (g === group ? { ...g, items: [...g.items, data] } : g));
        } else {
            // If the group is not found, create a new group, add the item to the groups.  (Creating a new instance in the process)
            return [...groups,
                {
                    key: keys.reduce((o, key) => ({ ...o, [key]: item[key] }), {}),
                    items: [data]
                }
            ];
        }
    }, [] as Array<Group<T>>);

    if (grouping.thenby != null) {
        return sortedGroups.map((g: Group<T>) => ({ ...g, items: groupBy(g.items, grouping.thenby || { keys: [] }) } as Group<Group<T>>));
    } else {
        return sortedGroups;
    }
};
