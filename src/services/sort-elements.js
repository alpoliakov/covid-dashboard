import removeChildrenElements from '../utils/remove-children-el';

const sortElements = (parent, numChildren, asc = true) => {
  const dirModifier = asc ? 1 : -1;
  const rows = [...parent.children];

  const sortedRows = rows.sort((a, b) => {
    const aElemText = a.children[numChildren].textContent.trim();
    const bElemText = b.children[numChildren].textContent.trim();

    if (Number.isNaN(aElemText * 1) && Number.isNaN(bElemText * 1)) {
      return aElemText > bElemText ? 1 * dirModifier : -1 * dirModifier;
    }

    return +aElemText > +bElemText ? 1 * dirModifier : -1 * dirModifier;
  });

  removeChildrenElements(parent);
  parent.append(...sortedRows);
};

export default sortElements;
