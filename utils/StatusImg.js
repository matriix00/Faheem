export default function StatusImg (Status) {
    if (Status=== 'Processing') return {require('../icons/done.png')};
    else if (Status=== 'Done')  return {require('../icons/done.png')};
    else  return {require('../icons/done.png')};
};
